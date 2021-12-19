import XIVAPI from 'xivapi-js';
import { useCache } from '../src/cache';

export type CSV = string | string[];

export interface IXIVSearchParams {
  lore?: boolean;
  indexes?: CSV;
  filters?: CSV;
  columns?: CSV;
  string_algo?: string;
  string_column?: string;
  sort_field?: string;
  sort_order?: string;
  limit?: number;
}

export interface IXIVApiDataListParams {
  limit?: number;
  ids?: CSV;
  page?: string;
}

export interface IXIVApiSearchParams {
  server?: string,
  page?: string,
}

export interface IXIVApiGetParams {
  extended?: boolean;
  data?: CSV;
  columns?: CSV;
}

export default class FFXIVApiSource {
  private xivApi: XIVAPI;
  private cahceLifetime = 8*60*60; // 8 hours in seconds
  
  constructor() {
    this.xivApi = new XIVAPI({
      private_key: process.env.XIV_API_KEY,
      language: 'en',
    });
  }

  protected async search(query: string | Record<string, unknown>, params?: IXIVSearchParams) {
    return await this.getData([query, params], async () => (this.xivApi.search(query, params)));
  }

  protected get data() {
    const content = async () => await this.xivApi.data.content()
    const list = async (name: string, params?: IXIVApiDataListParams) => (
      await this.getData([name, params], async () => (this.xivApi.data.list(name, params)))
    );
    const get = async (name: string, id: number) => await this.xivApi.data.get(name, id);
    const servers = async () => await this.xivApi.data.servers();
    const datacenters = async () => await this.xivApi.data.datacenters();

    return {
      content,
      list,
      get,
      servers,
      datacenters,
    };
  }

  protected get character() {
    const search = async (name: string, params?: IXIVApiSearchParams) => (
      await this.getData([name, params], async () => this.xivApi.character.search(name, params))
    );
    const get = async (id: number, params?: IXIVApiGetParams) => (
      await this.getData([`${id}`, params], async () => this.xivApi.character.get(id, params))
    );

    return {
      search,
      get,
    };
  }

  protected get freeCompany() {
    const search = async (name: string, params?: IXIVSearchParams) => (
      await this.getData([name, params], async () => this.xivApi.freecompany.search(name, params))
    );
    const get = async (id: number, params?: IXIVApiGetParams) => (
      await this.getData([`${id}`, params], async () => this.xivApi.freecompany.get(id, params))
    );

    return {
      search,
      get,
    };
  }

  protected get linkshell() {
    const search = async (name: string, params?: IXIVSearchParams) => (
      await this.getData([name, params], async () => this.xivApi.linkshell.search(name, params))
    );
    const get = async (id: number) => this.getData(`${id}`, async () => this.xivApi.linkshell.get(id));

    return {
      search,
      get,
    };
  }

  protected get pvpTeam() {
    const search = async (name: string, params?: IXIVSearchParams) => (
      await this.getData([name, params], async () => this.xivApi.pvpteam.search(name, params))
    );
    const get = async (id: number) => await this.getData(`${id}`, async () => this.xivApi.pvpteam.get(id));

    return {
      search,
      get,
    };
  }

  protected async lodestone() {
    return await this.getData('lodestone', async () => this.xivApi.lodestone());
  }

  private async getData(keyParams: string | unknown[], apiCall: () => Promise<unknown>) {
    const { getData } = useCache(this.cahceLifetime);
    const key = this.getCacheKey(keyParams)

    return await getData(key, apiCall);
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