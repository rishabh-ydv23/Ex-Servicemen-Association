import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Photo from './src/modules/models/Photo.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function testImageAccess() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('Connected to MongoDB');

    // Find all photos
    const photos = await Photo.find({});
    console.log(`Found ${photos.length} photos:`);

    for (const photo of photos) {
      console.log(`\n- ID: ${photo._id}`);
      console.log(`  Title: ${photo.title}`);
      console.log(`  URL: ${photo.url}`);
      
      // Extract filename from URL
      const urlParts = photo.url.split('/');
      const filename = urlParts[urlParts.length - 1];
      console.log(`  Filename: ${filename}`);
      
      // Check if file exists
      const filePath = path.join(process.cwd(), 'uploads', filename);
      console.log(`  File path: ${filePath}`);
      console.log(`  File exists: ${fs.existsSync(filePath)}`);
    }
    
    await mongoose.connection.close();
    console.log('\nDisconnected from MongoDB');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

testImageAccess();