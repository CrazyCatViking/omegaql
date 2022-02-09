import { useCache } from '../src/cache';
import axios from 'axios';

export interface IRESTSourceOptions {
  cacheOptions?: ICacheOptions;
  useRateLimiting?: boolean;
}

export interface ICacheOptions {
  useCache: boolean;
  cacheLifetime: number;
}

export interface IRESTParams {
  url: string;
  params?: Record<string, string>;
}

export interface ICacheSettings {
  cachePolicy?: 'no-cache' | 'use-cache';
  cacheLifetime?: number;
}

export default class RESTSource {
  headers: Record<string, string>;
  baseUrl: string;
  cacheOptions: ICacheOptions;
  useRateLimiting: boolean;

  constructor(baseUrl: string, headers: Record<string, string>, options?: IRESTSourceOptions) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.useRateLimiting = !!options.useRateLimiting;
    this.cacheOptions = {
      ...options.cacheOptions,
      useCache: !!options?.cacheOptions.useCache,
    };
  }

  protected async get({ url, params }: IRESTParams, cacheSettings?: ICacheSettings) {
    const getMethod = async () =>  (await axios({
        url: `${this.baseUrl}/${url}`,
        params,
        method: 'get',
        headers: {
          ...this.headers,
        },
      })).data;

    try {
      return await this.getData([this.headers, url, params], getMethod, cacheSettings);
    } catch (error: any) {
      throw (error.response.data);
    }
  }

  protected async post({ url, params }: IRESTParams, cacheSettings?: ICacheSettings) {
    const postMethod = async () => (await axios({
      url: `${this.baseUrl}/${url}`,
      method: 'post',
      data: new URLSearchParams(params),
      headers: {
        ...this.headers,
      },
    })).data;

    try {
      return await this.getData([this.headers, url, params], postMethod, cacheSettings);;
    } catch (error: any) {
      throw (error.response.data);
    }
  }

  protected async put({ url, params }: IRESTParams, cacheSettings?: ICacheSettings) {
    const putMethod = async () => (await axios({
      url: `${this.baseUrl}/${url}`,
      method: 'put',
      data: new URLSearchParams(params),
      headers: {
        ...this.headers,
      },
    })).data;

    try {
      return await this.getData([this.headers, url, params], putMethod, cacheSettings);;
    } catch (error: any) {
      throw (error.response.data);
    }
  }

  private async getData(keyParams: string | unknown[], apiCall: () => Promise<unknown>, cacheSettings?: ICacheSettings) {
    if (!this.cacheOptions.useCache) return await apiCall();
    if (cacheSettings?.cachePolicy === 'no-cache') return await apiCall();

    const lifetime = cacheSettings?.cacheLifetime ?? this.cacheOptions.cacheLifetime;
    const { getCacheData } = useCache(lifetime);
    const key = this.getCacheKey(keyParams);

    return await getCacheData(key, apiCall);
  }

  private getCacheKey(keyParams: string | unknown[]): string {
    if (typeof keyParams === 'string') return keyParams;

    const parsedKeys = keyParams.map((item: unknown) => {
      if (typeof item === 'string') return item;
      return JSON.stringify(item);
    });

    return parsedKeys.toString();
  }
}