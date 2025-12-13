import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: 'Administrator' }
  },
  { timestamps: true }
);

AdminSchema.methods.verifyPassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model('Admin', AdminSchema);


