import dotenv from 'dotenv';
import mongoose from 'mongoose';
import PublicNotification from './src/models/Notification.js';
import ModuleNotification from './src/modules/models/Notification.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function checkModels() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('✅ Connected to MongoDB');
    
    console.log('Public Notification model collection:', PublicNotification.collection.name);
    console.log('Module Notification model collection:', ModuleNotification.collection.name);
    
    // Test queries
    const publicNotifications = await PublicNotification.find({});
    console.log('Public notifications count:', publicNotifications.length);
    
    const moduleNotifications = await ModuleNotification.find({});
    console.log('Module notifications count:', moduleNotifications.length);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkModels();