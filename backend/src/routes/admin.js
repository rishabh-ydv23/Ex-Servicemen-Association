import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';
import { requireAuth } from '../middleware/auth.js';
import Notification from '../models/Notification.js';
import Event from '../models/Event.js';
import Photo from '../models/Photo.js';
import Member from '../models/Member.js';

const router = Router();

// Multer setup
const uploadsDir = path.join(process.cwd(), 'backend', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});
const upload = multer({ storage });

router.use(requireAuth);

// Notifications CRUD
router.post('/notifications', async (req, res) => {
  const item = await Notification.create(req.body);
  res.json(item);
});
router.put('/notifications/:id', async (req, res) => {
  const item = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});
router.delete('/notifications/:id', async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Events CRUD
router.post('/events', async (req, res) => {
  const item = await Event.create(req.body);
  res.json(item);
});
router.put('/events/:id', async (req, res) => {
  const item = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});
router.delete('/events/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  await Photo.deleteMany({ eventId: req.params.id });
  res.json({ success: true });
});

// Event images
router.post('/events/:id/photos', upload.array('images', 20), async (req, res) => {
  const eventId = req.params.id;
  const photos = await Photo.insertMany(
    (req.files || []).map(f => ({
      url: `/uploads/${f.filename}`,
      filename: f.filename,
      eventId
    }))
  );
  res.json(photos);
});
router.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findByIdAndDelete(req.params.id);
  if (photo?.filename) {
    const p = path.join(uploadsDir, photo.filename);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
  res.json({ success: true });
});

// Gallery photos
router.post('/photos', upload.array('images', 20), async (req, res) => {
  const tags = (req.body.tags || '').split(',').map(s => s.trim()).filter(Boolean);
  const photos = await Photo.insertMany(
    (req.files || []).map(f => ({ url: `/uploads/${f.filename}`, filename: f.filename, tags }))
  );
  res.json(photos);
});

// Members CRUD
router.post('/members', upload.single('photo'), async (req, res) => {
  const payload = {
    name: req.body.name,
    role: req.body.role,
    bio: req.body.bio || '',
    photoUrl: req.file ? `/uploads/${req.file.filename}` : undefined
  };
  const m = await Member.create(payload);
  res.json(m);
});
router.put('/members/:id', upload.single('photo'), async (req, res) => {
  const payload = {
    name: req.body.name,
    role: req.body.role,
    bio: req.body.bio || ''
  };
  if (req.file) payload.photoUrl = `/uploads/${req.file.filename}`;
  const m = await Member.findByIdAndUpdate(req.params.id, payload, { new: true });
  res.json(m);
});
router.delete('/members/:id', async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Zip download for event images
router.get('/events/:id/download', async (req, res) => {
  const eventId = req.params.id;
  const photos = await Photo.find({ eventId });
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename=event-${eventId}.zip`);
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(res);
  for (const photo of photos) {
    if (!photo.filename) continue;
    const filePath = path.join(uploadsDir, photo.filename);
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: photo.filename });
    }
  }
  archive.finalize();
});

export default router;


