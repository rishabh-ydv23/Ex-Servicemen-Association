import { Router } from 'express';
import { sendContactMail } from '../utils/mailer.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) return res.status(400).json({ error: 'All fields required' });
  try {
    await sendContactMail({ fromName: name, fromEmail: email, subject, message });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;


