import { createClient, RedisClientType } from 'redis';

let client: RedisClientType<any>;

export const redisConnect = async () => {
  client = createClient();

  client.on('error', (error) => {
    console.log(error);
  });

  await client.connect(); // Connects to localhost:6379
};

export const useCache = (lifetime: number) => {
  const getCacheData = async (key: string, dataAccessor: () => Promise<unknown>) => {
    const data = await client.get(key);

    if (data) return JSON.parse(data);

    const newData = await dataAccessor();
    client.setEx(key, lifetime, JSON.stringify(newData));

    return newData;
  };

  const setData = async(key: string, data: unknown) => {
    await client.set(key, JSON.stringify(data));
  }

  const setExData = async (key: string, data: unknown) => {
    await client.setEx(key, lifetime, JSON.stringify(data));
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