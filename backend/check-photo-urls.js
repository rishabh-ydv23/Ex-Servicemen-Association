import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Photo from './src/modules/models/Photo.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function checkPhotoUrls() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('Connected to MongoDB');

    // Find all photos
    const photos = await Photo.find({});
    console.log(`Found ${photos.length} photos:`);

    photos.forEach(photo => {
      console.log(`- ID: ${photo._id}`);
      console.log(`  Title: ${photo.title}`);
      console.log(`  URL: ${photo.url}`);
      console.log(`  Tags: ${photo.tags}`);
      console.log('---');
    });
    
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkPhotoUrls();