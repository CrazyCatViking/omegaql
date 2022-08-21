import { createClient, RedisClientType } from 'redis';
import { ICache } from './cache';

let client: RedisClientType<any>;

export const redisConnect = async () => {
  const cacheHostName = process.env.REDIS_HOST_NAME;
  const cacheKey = process.env.REDIS_CACHE_KEY;

  client = createClient({
    url: `rediss://${cacheHostName}:6380`,
    password: cacheKey,
  });

  client.on('error', (error) => {
    console.log(error);
  });

  const minToMilis = (min: number) => min * 60 * 1000;

  setInterval(() => {
    client.ping();
  }, minToMilis(5));

  await client.connect(); // Connects to localhost:6379
};

export const useRedisCache = (lifetime: number): ICache => {
  const getCacheData = async <TData>(key: string, dataAccessor: () => Promise<TData>): Promise<TData> => {
    const data = await client.get(key);

    if (data) return JSON.parse(data);

    const newData = await dataAccessor();
    client.setEx(key, lifetime, JSON.stringify(newData));

    return newData;
  };

  const setData = async(key: string, data: unknown) => {
    client.set(key, JSON.stringify(data));
  }

  const setExData = async (key: string, data: unknown) => {
    client.setEx(key, lifetime, JSON.stringify(data));
  };

  const getData = async <TData>(key: string): Promise<TData> => {
    const data = await client.get(key);
    if (!data) return undefined;
    return JSON.parse(data);
  }

  const invalidateCache = async (key: string) => {
    await client.del(key);
  };

  return {
    client,
    getCacheData,
    getData,
    setData,
    setExData,
    invalidateCache,
  };
};