import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

NotificationSchema.index({ createdAt: -1 });

export default mongoose.model('Notification', NotificationSchema);


