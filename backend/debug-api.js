import dotenv from 'dotenv';
import mongoose from 'mongoose';
import publicRoutes from './src/routes/public.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

// Mock request and response objects
const mockReq = {
  query: {}
};

const mockRes = {
  json: function(data) {
    console.log('API Response:', JSON.stringify(data, null, 2));
    process.exit(0);
  }
};

async function debugApi() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('✅ Connected to MongoDB');
    
    // Call the notifications route handler directly
    console.log('Calling notifications route handler...');
    // We need to access the route handler from the router
    // This is a bit tricky, so let's just simulate the query
    
    // Import the model used by public routes
    const Notification = (await import('./src/modules/models/Notification.js')).default;
    console.log('Using model from:', Notification.collection.name);
    
    const items = await Notification.find({}).sort({ createdAt: -1 });
    console.log('Direct query result:', items.length);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

debugApi();