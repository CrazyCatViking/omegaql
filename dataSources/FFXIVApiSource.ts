import XIVAPI from 'xivapi-js';

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
  
  constructor() {
    this.xivApi = new XIVAPI({
      private_key: process.env.XIV_API_KEY,
      language: 'en',
    });
  }

  protected async search(query: string | Record<string, unknown>, params?: IXIVSearchParams) {
    return await this.xivApi.search(query, params);
  }

  protected get data() {
    const content = async () => await this.xivApi.data.content()
    const list = async (name: string, params?: IXIVApiDataListParams) => (
      await this.xivApi.data.list(name, params)
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
      await this.xivApi.character.search(name, params)
    );
    const get = async (id: number, params?: IXIVApiGetParams) => (
      await this.xivApi.character.get(id, params)
    );

    return {
      search,
      get,
    };
  }

  protected get freeCompany() {
    const search = async (name: string, params?: IXIVSearchParams) => (
      await this.xivApi.freecompany.search(name, params)
    );
    const get = async (id: number, params?: IXIVApiGetParams) => (
      await this.xivApi.freecompany.get(id, params)
    );

    return {
      search,
      get,
    };
  }

  protected get linkshell() {
    const search = async (name: string, params?: IXIVSearchParams) => (
      await this.xivApi.linkshell.search(name, params)
    );
    const get = async (id: number) => await this.xivApi.linkshell.get(id);

    return {
      search,
      get,
    };
  }

  protected get pvpTeam() {
    const search = async (name: string, params?: IXIVSearchParams) => (
      await this.xivApi.pvpteam.search(name, params)
    );
    const get = async (id: number) => await this.xivApi.pvpteam.get(id);

    return {
      search,
      get,
    };
  }

  protected async lodestone() {
    return await this.xivApi.lodestone();
  }
}