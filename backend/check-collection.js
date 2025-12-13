import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function checkCollections() {
  try {
    const connection = await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('✅ Connected to MongoDB');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:');
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });
    
    // Check notifications collection specifically
    const notificationCollection = mongoose.connection.db.collection('notifications');
    const count = await notificationCollection.countDocuments();
    console.log(`\n_notifications collection has ${count} documents`);
    
    if (count > 0) {
      const docs = await notificationCollection.find({}).toArray();
      console.log('Sample documents:');
      docs.slice(0, 2).forEach(doc => {
        console.log(`  - ${doc.title}`);
      });
    }
    
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkCollections();