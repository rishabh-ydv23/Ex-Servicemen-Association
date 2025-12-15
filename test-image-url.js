// Simple test to verify image URLs
const testUrls = [
  'http://localhost:5000/uploads/1765813645950-804884649.jpeg',
  'http://localhost:5000/uploads/1765813685061-148562216.jpg'
];

console.log('Testing image URLs:');
testUrls.forEach(url => {
  console.log(`URL: ${url}`);
  console.log(`Expected path: backend/uploads/${url.split('/').pop()}`);
});