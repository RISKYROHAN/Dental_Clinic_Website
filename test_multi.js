const http = require('http');

const req = http.request('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, res => {
  console.log('Status Code:', res.statusCode);
  res.on('data', chunk => console.log('CHUNK:', chunk.toString()));
});
req.on('error', console.error);
req.write(JSON.stringify({ 
  messages: [
    { role: 'user', content: 'hello' },
    { role: 'assistant', content: 'hello back' },
    { role: 'user', content: 'what is my name?' }
  ] 
}));
req.end();
