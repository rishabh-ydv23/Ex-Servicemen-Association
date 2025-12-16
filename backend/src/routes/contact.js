import { Router } from 'express';
import { sendContactMail } from '../utils/mailer.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) return res.status(400).json({ error: 'All fields required' });
  try {
    console.log('Attempting to send contact email:', { name, email, subject });
    await sendContactMail({ fromName: name, fromEmail: email, subject, message });
    console.log('Contact email sent successfully');
    res.json({ success: true });
  } catch (e) {
    console.error('Failed to send contact email:', e);
    res.status(500).json({ error: 'Failed to send message: ' + e.message });
  }
});

export default router;


