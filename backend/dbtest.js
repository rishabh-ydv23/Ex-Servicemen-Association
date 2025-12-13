import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function testDbConnection() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('✅ MongoDB connected successfully!');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📋 Collections in database:');
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });
    
    // Try to access Admin collection
    const adminCollection = mongoose.connection.db.collection('admins');
    const adminCount = await adminCollection.countDocuments();
    console.log(`\n👤 Admin documents: ${adminCount}`);
    
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

testDbConnection();