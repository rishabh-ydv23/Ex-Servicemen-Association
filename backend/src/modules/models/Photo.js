import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    title: { type: String },
    tags: [{ type: String }],
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  },
  { timestamps: true }
);

PhotoSchema.index({ createdAt: -1 });

const Photo = mongoose.model('Photo', PhotoSchema);
export default Photo;


