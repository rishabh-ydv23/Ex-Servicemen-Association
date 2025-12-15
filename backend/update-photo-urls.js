import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Photo from './src/modules/models/Photo.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex-servicemen-foundation';

async function updatePhotoUrls() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'exservicemen' });
    console.log('Connected to MongoDB');

    // Find all photos
    const photos = await Photo.find({});
    console.log(`Found ${photos.length} photos to update`);

    let updatedCount = 0;
    
    for (const photo of photos) {
      // Check if the URL contains the incorrect path
      if (photo.url && photo.url.includes('/backend/uploads/')) {
        // Update the URL to remove the extra backend segment
        const newUrl = photo.url.replace('/backend/uploads/', '/uploads/');
        await Photo.findByIdAndUpdate(photo._id, { url: newUrl });
        console.log(`Updated photo ${photo._id}: ${photo.url} -> ${newUrl}`);
        updatedCount++;
      }
    }
    
    console.log(`Updated ${updatedCount} photo URLs`);
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updatePhotoUrls();