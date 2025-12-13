import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    membershipStatus: { 
      type: String, 
      enum: ['pending', 'active', 'inactive'], 
      default: 'pending' 
    },
    dateOfBirth: { type: Date },
    serviceDetails: {
      branch: { type: String },
      rank: { type: String },
      serviceNumber: { type: String },
      fromDate: { type: Date },
      toDate: { type: Date },
    },
  },
  { timestamps: true }
);

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

UserSchema.statics.createWithPassword = async function (userData, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  return this.create({ ...userData, passwordHash });
};

export default mongoose.model('User', UserSchema);