import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import Notification from '../models/Notification.js';

const router = Router();

// Public: list with search
router.get('/', async (req, res) => {
  const { q } = req.query;
  const filter = q
    ? { $or: [{ title: { $regex: q, $options: 'i' } }, { message: { $regex: q, $options: 'i' } }] }
    : {};
  const items = await Notification.find(filter).sort({ createdAt: -1 });
  res.json(items);
});

// Admin: create
router.post('/', requireAuth, async (req, res) => {
  const { title, message, date } = req.body || {};
  if (!title || !message) return res.status(400).json({ message: 'Title and message required' });
  const item = await Notification.create({ title, message, date: date ? new Date(date) : new Date() });
  res.json(item);
});

// Admin: update
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, message, date } = req.body || {};
  const updated = await Notification.findByIdAndUpdate(
    id,
    { title, message, date },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

// Admin: delete
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  await Notification.findByIdAndDelete(id);
  res.json({ success: true });
});

export default router;


