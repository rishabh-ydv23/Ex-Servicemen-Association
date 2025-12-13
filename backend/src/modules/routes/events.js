import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import Event from '../models/Event.js';
import Photo from '../models/Photo.js';
import { upload } from '../utils/storage.js';

const router = Router();

// Public list with search and date sort
router.get('/', async (req, res) => {
  const { q } = req.query;
  const filter = q
    ? { $or: [{ title: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } }] }
    : {};
  const items = await Event.find(filter).sort({ date: -1 });
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Event.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

// Admin create event
router.post('/', requireAuth, async (req, res) => {
  const { title, description, date, tags } = req.body || {};
  if (!title || !description || !date) return res.status(400).json({ message: 'Missing fields' });
  const item = await Event.create({ title, description, date: new Date(date), tags: tags || [] });
  res.json(item);
});

// Admin update event
router.put('/:id', requireAuth, async (req, res) => {
  const { title, description, date, tags } = req.body || {};
  const updated = await Event.findByIdAndUpdate(
    req.params.id,
    { title, description, date, tags },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

// Admin delete event and related photos
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  await Photo.deleteMany({ eventId: id });
  await Event.findByIdAndDelete(id);
  res.json({ success: true });
});

// Admin: upload images for event
router.post('/:id/images', requireAuth, upload.array('images', 12), async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  const base = `${req.protocol}://${req.get('host')}`;
  const urls = (req.files || []).map((f) => `${base}/uploads/${f.filename}`);
  event.imageUrls = [...(event.imageUrls || []), ...urls];
  await event.save();
  // also store in Photo model for gallery
  await Photo.insertMany(urls.map((url) => ({ url, eventId: id })));
  res.json({ imageUrls: event.imageUrls });
});

export default router;


