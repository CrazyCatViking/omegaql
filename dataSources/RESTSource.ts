import axios from 'axios';

export default class RESTSource {
  headers: Record<string, string>;
  baseUrl: string;

  constructor(baseUrl: string, headers: Record<string, string>) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  protected async get(url: string, params?: Record<string, string>) {
    try {
      return (await axios({
        url: `${this.baseUrl}/${url}`,
        params,
        method: 'get',
        headers: {
          ...this.headers,
        },
      })).data;
    } catch (error: any) {
      throw (error.response.data);
    }
  }

  protected async post(url: string, data?: Record<string, string>) {
    try {
      return (await axios({
        url: `${this.baseUrl}/${url}`,
        method: 'post',
        data: new URLSearchParams(data),
        headers: {
          ...this.headers,
        },
      })).data;
    } catch (error: any) {
      throw (error.response.data);
    }
  }

  protected async put(url: string, data?: Record<string, unknown>) {
    try {
      return (await axios({
        url: `${this.baseUrl}/${url}`,
        method: 'put',
        data,
        headers: {
          ...this.headers,
        },
      })).data;
    } catch (error: any) {
      throw (error.response.data);
    }
  }
}