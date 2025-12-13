import nodemailer from 'nodemailer';

export function createTransport() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  // Fallback: ethereal for dev
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: { user: process.env.ETHEREAL_USER, pass: process.env.ETHEREAL_PASS }
  });
}

export async function sendContactMail({ fromName, fromEmail, subject, message }) {
  const transporter = createTransport();
  const to = process.env.CONTACT_TO || process.env.SMTP_USER;
  const info = await transporter.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to,
    subject: `[Ex-Servicemen] ${subject}`,
    text: message
  });
  return info;
}


