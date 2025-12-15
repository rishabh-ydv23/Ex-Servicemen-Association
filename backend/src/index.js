import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import createError from 'http-errors';

import connectDb from './modules/config/db.js';
import authRoutes from './modules/routes/auth.js';
import userAuthRoutes from './modules/routes/userAuth.js';
import notificationRoutes from './modules/routes/notifications.js';
import eventRoutes from './modules/routes/events.js';
import galleryRoutes from './modules/routes/gallery.js';
import memberRoutes from './modules/routes/members.js';
import contactRoutes from './modules/routes/contact.js';
import publicRoutes from './routes/public.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database
connectDb();

// Configure CORS to allow multiple origins including both common Vite ports
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      process.env.CLIENT_URL
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user-auth', userAuthRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/contact', contactRoutes);

// Health
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler
app.use((_req, _res, next) => {
  next(createError(404, 'Route not found'));
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Server error',
    status,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


