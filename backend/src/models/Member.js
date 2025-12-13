import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, default: '' },
    photoUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Member', MemberSchema);


