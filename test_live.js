const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
env.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    process.env[key] = value.join('=').trim();
  }
});

const { generateText } = require('ai');
const { google } = require('@ai-sdk/google');

async function main() {
  try {
    const result = await generateText({
      model: google('gemini-3-flash-preview'),
      prompt: 'Hello',
    });
    console.log("SUCCESS FLASH:", result.text.substring(0,20));
  } catch (error) {
    console.error("ERROR FLASH:", error.message || error);
  }
}
main();
