import nodemailer from 'nodemailer';

export function createTransport() {
  if (process.env.SMTP_HOST) {
    // Check if required SMTP credentials are provided
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP configuration incomplete: SMTP_USER or SMTP_PASS not set, using Ethereal fallback');
      // Fallback to Ethereal if SMTP credentials are missing
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: process.env.ETHEREAL_USER, pass: process.env.ETHEREAL_PASS }
      });
    }
    
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
  console.log('Using Ethereal email service for development');
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
  
  // Check if email configuration exists
  if (!to) {
    throw new Error('Email configuration missing: CONTACT_TO or SMTP_USER not set');
  }
  
  console.log('Sending email with config:', { 
    from: `${fromName} <${fromEmail}>`,
    to,
    subject: `[Ex-Servicemen Service Foundation] ${subject}`
  });
  
  const info = await transporter.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to,
    subject: `[Ex-Servicemen Service Foundation] ${subject}`,
    text: message
  });
  return info;
}


