import { RedisPubSub } from "graphql-redis-subscriptions";
import { createClient } from "redis";
import Redis from 'ioredis';

export let pubSub: RedisPubSub;

export const createPubSub = () => {
  const cacheHostName = process.env.REDIS_HOST_NAME;
  const cacheKey = process.env.REDIS_CACHE_KEY;

  const options = {
    host: cacheHostName,
    port: 6380,
    password: cacheKey,
    tls: {
      servername: cacheHostName,
    }
  }

  pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  });
};
