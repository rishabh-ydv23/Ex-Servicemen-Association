import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const apiLimiter = rateLimit({ windowMs: 60 * 1000, max: 200 });
app.use('/api/', apiLimiter);

// Static uploads
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function start() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API listening on :${PORT}`));
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

start();


