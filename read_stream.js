const fs = require('fs');
const http = require('http');

const req = http.request('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, res => {
  let fullData = '';
  res.on('data', chunk => fullData += chunk.toString() + '\n');
  res.on('end', () => console.log(fullData));
});
req.on('error', console.error);
req.write(JSON.stringify({ 
  messages: [
    { role: 'user', content: 'Hi' },
    { role: 'assistant', content: '' },
    { role: 'user', content: 'How can i' }
  ]
}));
req.end();
