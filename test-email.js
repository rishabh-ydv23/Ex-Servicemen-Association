const axios = require('axios');

async function testEmail() {
  try {
    const response = await axios.post('http://localhost:5000/api/contact', {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Email from Ex-Servicemen Service Foundation',
      message: 'This is a test message to verify that the email functionality is working correctly.'
    });
    
    console.log('Email sent successfully!');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Failed to send email:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testEmail();