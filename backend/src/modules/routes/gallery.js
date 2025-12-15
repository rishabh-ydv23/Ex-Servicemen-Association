import { Router } from 'express';
import Photo from '../models/Photo.js';
import { upload } from '../utils/storage.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const { tag, q } = req.query;
  const filter = {};
  if (tag) filter.tags = tag;
  if (q) filter.$or = [{ title: { $regex: q, $options: 'i' } }];
  const items = await Photo.find(filter).sort({ createdAt: -1 });
  res.json(items);
});

router.post('/', requireAuth, upload.single('images'), async (req, res) => {
  const { title, tags } = req.body || {};
  const tagsArr = typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : tags || [];
  const base = `${req.protocol}://${req.get('host')}`;
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

  const created = await Photo.create({
    url: `${base}/uploads/${req.file.filename}`,
    title,
    tags: tagsArr,
  });

  res.json(created);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await Photo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;


