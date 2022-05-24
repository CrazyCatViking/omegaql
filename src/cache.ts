import Redis from 'ioredis';

const cacheHostName = process.env.REDIS_HOST_NAME;
const cacheKey = process.env.REDIS_CACHE_KEY;

let client: Redis;

const options = {
  host: cacheHostName,
  port: 6380,
  password: cacheKey,
  tls: {
    servername: cacheHostName,
  }
}

export const redisConnect = async () => {
  client = new Redis(options);

  client.on('error', (error) => {
    console.log(error);
  });

  const minToMilis = (min: number) => min * 60 * 1000;

  setInterval(() => {
    client.ping();
  }, minToMilis(5));
};

export const useCache = (lifetime: number) => {
  const getCacheData = async (key: string, dataAccessor: () => Promise<unknown>) => {
    const data = await client.get(key);

    if (data) return JSON.parse(data);

    const newData = await dataAccessor();
    client.setex(key, lifetime, JSON.stringify(newData));

    return newData;
  };

  const setData = async(key: string, data: unknown) => {
    await client.set(key, JSON.stringify(data));
  }

  const setExData = async (key: string, data: unknown) => {
    await client.setex(key, lifetime, JSON.stringify(data));
  };

  const getData = async(key: string) => {
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