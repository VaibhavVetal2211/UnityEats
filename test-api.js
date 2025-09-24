// Simple test script to check if CORS is working
const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing API connection...');
    
    const response = await fetch('http://localhost:5000/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    console.log('✅ API Response:', data);
    
  } catch (error) {
    console.error('❌ API Error:', error.message);
  }
}

testAPI();
