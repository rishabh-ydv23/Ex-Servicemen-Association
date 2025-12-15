import { Router } from 'express';
import Member from '../models/Member.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../utils/storage.js';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await Member.find({}).sort({ priority: 1, createdAt: 1 });
  res.json(items);
});

router.post('/', requireAuth, upload.single('photo'), async (req, res) => {
  const { name, role, bio, priority } = req.body || {};
  if (!name || !role) return res.status(400).json({ message: 'Name and role required' });
  const base = `${req.protocol}://${req.get('host')}`;
  const photoUrl = req.file ? `${base}/uploads/${req.file.filename}` : undefined;
  const created = await Member.create({ name, role, bio, priority: Number(priority) || 0, photoUrl });
  res.json(created);
});

router.put('/:id', requireAuth, upload.single('photo'), async (req, res) => {
  const { name, role, bio, priority } = req.body || {};
  const base = `${req.protocol}://${req.get('host')}`;
  const updates = { name, role, bio, priority: Number(priority) || 0 };
  if (req.file) updates.photoUrl = `${base}/uploads/${req.file.filename}`;
  const updated = await Member.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;


