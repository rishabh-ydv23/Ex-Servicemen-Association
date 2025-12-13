import { Router } from 'express';
import Notification from '../modules/models/Notification.js';
import Event from '../modules/models/Event.js';
import Photo from '../modules/models/Photo.js';
import Member from '../modules/models/Member.js';
import Counter from '../models/Counter.js';

const router = Router();

router.get('/home', async (req, res) => {
  const [notifications, photos] = await Promise.all([
    Notification.find().sort({ createdAt: -1 }).limit(3),
    Photo.find().sort({ createdAt: -1 }).limit(3)
  ]);
  res.json({ notifications, photos });
});

router.get('/notifications', async (req, res) => {
  const { q } = req.query;
  const filter = q ? { $or: [ { title: { $regex: q, $options: 'i' } }, { message: { $regex: q, $options: 'i' } } ] } : {};
  const items = await Notification.find(filter).sort({ createdAt: -1 });
  res.json(items);
});

router.get('/events', async (req, res) => {
  const { q } = req.query;
  const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
  const items = await Event.find(filter).sort({ date: -1 });
  res.json(items);
});

router.get('/events/:id/photos', async (req, res) => {
  const photos = await Photo.find({ eventId: req.params.id }).sort({ createdAt: -1 });
  res.json(photos);
});

router.get('/gallery', async (req, res) => {
  const { tag } = req.query;
  const filter = tag ? { tags: tag } : {};
  const photos = await Photo.find(filter).sort({ createdAt: -1 });
  res.json(photos);
});

router.get('/members', async (req, res) => {
  const members = await Member.find().sort({ createdAt: -1 });
  res.json(members);
});

router.post('/visit', async (req, res) => {
  const counter = await Counter.findOneAndUpdate(
    { key: 'visits' },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
  res.json({ total: counter.count });
});

export default router;


