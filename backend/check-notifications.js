import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Notification from './src/modules/models/Notification.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function checkNotifications() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('✅ Connected to MongoDB');
    
    // Check notifications
    const notifications = await Notification.find({});
    console.log(`📊 Found ${notifications.length} notifications in database:`);
    
    notifications.forEach((notification, index) => {
      console.log(`${index + 1}. Title: ${notification.title}`);
      console.log(`   Message: ${notification.message.substring(0, 50)}...`);
      console.log(`   Date: ${notification.date}`);
      console.log(`   Created: ${notification.createdAt}`);
      console.log('');
    });
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error checking notifications:', error.message);
    process.exit(1);
  }
}

checkNotifications();