const fs = require('fs');
const ai = require('ai');
const dataStreamKeys = Object.keys(ai).filter(key => key.toLowerCase().includes('data'));
const resKeys = Object.keys(ai).filter(k => k.toLowerCase().includes('response'));
fs.writeFileSync('output2.txt', JSON.stringify({ dataStreamKeys, resKeys }, null, 2), 'utf8');
