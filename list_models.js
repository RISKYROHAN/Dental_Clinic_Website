const fs = require('fs');
const https = require('https');
const env = fs.readFileSync('.env.local', 'utf8');
const key = env.split('\n').find(l => l.startsWith('GOOGLE_GENERATIVE_AI_API_KEY')).split('=')[1].trim();

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('error.txt', data);
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
