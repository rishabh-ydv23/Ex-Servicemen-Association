import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

EventSchema.index({ date: -1 });

export default mongoose.model('Event', EventSchema);


