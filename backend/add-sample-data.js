import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Notification from './src/modules/models/Notification.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function addSampleData() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('✅ Connected to MongoDB');
    
    // Clear existing notifications
    await Notification.deleteMany({});
    console.log('🧹 Cleared existing notifications');
    
    // Add sample notifications
    const sampleNotifications = [
      {
        title: "Annual Veterans Day Ceremony",
        message: "Join us for our annual Veterans Day ceremony on November 11th at 10 AM. We will honor all veterans who have served our country with dedication and courage.",
        date: new Date('2025-11-11')
      },
      {
        title: "New Membership Drive",
        message: "We're excited to announce our new membership drive starting next month. All ex-servicemen are welcome to join our association and become part of our growing community.",
        date: new Date('2025-12-01')
      },
      {
        title: "Fundraising Event",
        message: "Our annual fundraising event will be held on December 20th. All proceeds will go toward supporting veterans in need. Hope to see you there!",
        date: new Date('2025-12-20')
      },
      {
        title: "Holiday Dinner",
        message: "Come celebrate the holidays with fellow veterans at our annual dinner on December 28th. RSVP required by December 20th.",
        date: new Date('2025-12-28')
      }
    ];
    
    for (const notification of sampleNotifications) {
      await Notification.create(notification);
      console.log(`➕ Added notification: "${notification.title}"`);
    }
    
    console.log('\n✅ Sample data added successfully!');
    console.log('📊 Total notifications in database:', await Notification.countDocuments());
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error adding sample data:', error.message);
    process.exit(1);
  }
}

addSampleData();