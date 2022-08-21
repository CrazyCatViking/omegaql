export { useNodeCache as useCache } from "./nodeCache"; 

export interface ICache {
  getCacheData: <TData = any>(key: string, dataAccessor: () => Promise<TData>) => Promise<TData>;
  setData: (key: string, data: unknown) => void;
  setExData: (key: string, data: unknown) => void;
  getData: <TData = any>(key: string) => Promise<TData>;
  invalidateCache: (key: string) => void;
  client?: any;
}