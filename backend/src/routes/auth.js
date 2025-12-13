import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await admin.verifyPassword(password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
  res.json({ token, admin: { email: admin.email, name: admin.name } });
});

router.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ error: 'Admin not found' });
  const ok = await admin.verifyPassword(oldPassword);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  admin.passwordHash = await bcrypt.hash(newPassword, 10);
  await admin.save();
  res.json({ success: true });
});

export default router;


