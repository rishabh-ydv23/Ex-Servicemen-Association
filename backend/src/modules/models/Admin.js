import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: 'Administrator' },
  },
  { timestamps: true }
);

AdminSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

AdminSchema.statics.createWithPassword = async function (email, password, name) {
  const passwordHash = await bcrypt.hash(password, 10);
  return this.create({ email, passwordHash, name });
};

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;


