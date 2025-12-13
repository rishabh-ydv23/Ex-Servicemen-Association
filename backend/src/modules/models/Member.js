import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String },
    photoUrl: { type: String },
    priority: { type: Number, default: 0 },
  },
  { timestamps: true }
);

MemberSchema.index({ priority: -1, createdAt: -1 });

const Member = mongoose.model('Member', MemberSchema);
export default Member;


