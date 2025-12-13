import { Router } from 'express';
import { createTransporter } from '../config/mailer.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ message: 'Missing fields' });
  const to = process.env.CONTACT_EMAIL || process.env.SMTP_USER;
  if (!to) return res.status(500).json({ message: 'Email not configured' });
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: `Ex-Servicemen Association <${process.env.SMTP_USER || 'no-reply@example.com'}>`,
    to,
    subject: subject || 'New contact message',
    replyTo: email,
    text: `From: ${name} <${email}>
Subject: ${subject || ''}

${message}`,
  });
  res.json({ success: true, id: info.messageId });
});

export default router;


