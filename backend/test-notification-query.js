import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Notification from './src/modules/models/Notification.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function testQuery() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('✅ Connected to MongoDB');
    
    // Test the same query as in the API
    const items = await Notification.find({}).sort({ createdAt: -1 });
    console.log('Query result:', items);
    console.log('Number of items:', items.length);
    
    // Test with empty filter
    const items2 = await Notification.find();
    console.log('All items:', items2.length);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testQuery();