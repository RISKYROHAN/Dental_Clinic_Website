import { createClient } from 'redis';

let redisClient = null;

export default async function getRedisClient() {
  // If we already have a client that's ready, return it
  if (redisClient && redisClient.isReady) {
    return redisClient;
  }

  // If a client exists but isn't connected, we shouldn't create a new one immediately
  // unless we're sure it's dead, but the redis package handles reconnection attempts.
  // We'll initialize it if it's null.
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on('error', (err) => console.error('Redis Client Error', err));

    // Connect if not already connecting
    await redisClient.connect();
  } else if (!redisClient.isOpen) {
     await redisClient.connect();
  }

  return redisClient;
}
