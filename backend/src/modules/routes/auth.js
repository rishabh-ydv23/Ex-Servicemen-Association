import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await admin.verifyPassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET || 'devsecret', {
    expiresIn: '7d',
  });
  res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
});

// Bootstrap endpoint to create an admin if none exists
router.post('/bootstrap', async (req, res) => {
  const { email, password, name } = req.body || {};
  const exists = await Admin.findOne({});
  if (exists) return res.status(400).json({ message: 'Admin already exists' });
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const admin = await Admin.createWithPassword(email, password, name || 'Administrator');
  res.json({ id: admin._id, email: admin.email });
});

export default router;


