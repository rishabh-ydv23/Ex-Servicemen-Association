import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function run() {
  await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
  const email = process.env.ADMIN_EMAIL || 'admin@exservicemen.org';
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
  let admin = await Admin.findOne({ email });
  if (!admin) {
    admin = await Admin.create({ email, passwordHash: await bcrypt.hash(password, 10), name: 'Site Admin' });
    console.log('Admin created:', email, 'password:', password);
  } else {
    console.log('Admin exists:', email);
  }
  await mongoose.disconnect();
}

run().then(() => process.exit(0));


