const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
env.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    process.env[key] = value.join('=').trim();
  }
});

const { streamText } = require('ai');
const { google } = require('@ai-sdk/google');

async function main() {
  try {
    const result = await streamText({
      model: google('gemini-2.5-flash'),
      prompt: 'Hello',
    });
    const response = result.toUIMessageStreamResponse();
    console.log("Headers:", response.headers);
    const reader = response.body.getReader();
    const { value } = await reader.read();
    console.log("Chunk:", new TextDecoder().decode(value));
  } catch (error) {
    console.error('Error:', error);
  }
}
main();
