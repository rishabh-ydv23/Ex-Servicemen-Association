import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    filename: { type: String },
    tags: [{ type: String, trim: true }],
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
  },
  { timestamps: true }
);

PhotoSchema.index({ createdAt: -1 });

export default mongoose.model('Photo', PhotoSchema);


