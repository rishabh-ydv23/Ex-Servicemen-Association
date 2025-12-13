import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    imageUrls: [{ type: String }],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

EventSchema.index({ date: -1 });

const Event = mongoose.model('Event', EventSchema);
export default Event;


