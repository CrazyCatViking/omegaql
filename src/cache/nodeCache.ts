import NodeCache from "node-cache";
import { ICache } from "./cache";

let client: NodeCache;

export const createNodeCache = () => {
  client = new NodeCache();
}

export const useNodeCache = (lifetime: number): ICache => {
  const getCacheData = async <TData = any>(key: string, dataAccessor: () => Promise<TData>): Promise<TData> => {
    const data = client.get<TData>(key);

    if (data) return data;

    const newData = await dataAccessor();
    client.set(key, newData, lifetime);

    return newData;
  };

  const setData = (key: string, data: unknown) => {
    client.set(key, data);
  };

  const setExData = (key: string, data: unknown) => {
    client.set(key, data, lifetime);
  };

  const getData = async <TData = any>(key: string): Promise<TData> => {
    const data = client.get<TData>(key);
    if (!data) return undefined;
    return data;
  };

  const invalidateCache = (key: string) => {
    client.del(key);
  };

  return {
    getCacheData,
    setData,
    setExData,
    getData,
    invalidateCache,
    client,
  };
}