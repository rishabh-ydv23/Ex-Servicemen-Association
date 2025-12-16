const nodemailer = require('nodemailer');

async function generateEtherealCredentials() {
  try {
    // Generate Ethereal credentials
    const account = await nodemailer.createTestAccount();
    
    console.log('Ethereal Email Credentials:');
    console.log('==========================');
    console.log('SMTP_HOST:', 'smtp.ethereal.email');
    console.log('SMTP_PORT:', 587);
    console.log('SMTP_USER:', account.user);
    console.log('SMTP_PASS:', account.pass);
    console.log('Preview URL:', nodemailer.getTestMessageUrl({ messageId: 'test' }));
    console.log('');
    console.log('Update your .env file with these credentials:');
    console.log('============================================');
    console.log('SMTP_USER=' + account.user);
    console.log('SMTP_PASS=' + account.pass);
    console.log('CONTACT_EMAIL=' + account.user);
    
    // Test sending an email
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });
    
    const info = await transporter.sendMail({
      from: `"Test Sender" <${account.user}>`,
      to: account.user,
      subject: 'Test Email from Ex-Servicemen Service Foundation',
      text: 'This is a test email to verify that the email functionality is working correctly.'
    });
    
    console.log('');
    console.log('Test email sent successfully!');
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.error('Error generating credentials:', error);
  }
}

generateEtherealCredentials();