import { createClient } from 'redis';

let cached = global.redisClient;

if (!cached) {
  cached = global.redisClient = { client: null, promise: null };
}

export default async function getRedisClient() {
  if (cached.client && cached.client.isReady) {
    return cached.client;
  }

  if (!cached.promise) {
    const client = createClient({
      url: process.env.REDIS_URL,
    });
    client.on('error', (err) => console.error('Redis Client Error', err));
    cached.promise = client.connect().then(() => client);
  }

  try {
    cached.client = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.client;
}
