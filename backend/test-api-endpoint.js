import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Notification from './src/modules/models/Notification.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function testApiEndpoint() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('✅ Connected to MongoDB');
    
    // Simulate the exact query from the API endpoint
    const q = undefined; // No search query
    const filter = q ? { $or: [ { title: { $regex: q, $options: 'i' } }, { message: { $regex: q, $options: 'i' } } ] } : {};
    console.log('Filter:', filter);
    
    const items = await Notification.find(filter).sort({ createdAt: -1 });
    console.log('Items found:', items.length);
    console.log('Items:', JSON.stringify(items, null, 2));
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testApiEndpoint();