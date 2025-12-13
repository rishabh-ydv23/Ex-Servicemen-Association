import mongoose from 'mongoose';

export default async function connectDb() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';
  try {
    await mongoose.connect(mongoUri, {
      autoIndex: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error', error);
    process.exit(1);
  }
}


