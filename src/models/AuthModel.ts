import { IAuthTokens } from '@/types';
import jwt from 'jsonwebtoken';
import BaseModel from './BaseModel';

const ClientSecret = process.env.CLIENT_SECRET;
const TokenValidTime = '30m';

export default class AuthModel extends BaseModel {
  public async login(authCode: string) {
    const discordToken = await this.DiscordApi.login(authCode);

    const authTokens = {
      discordToken,
    };

    return jwt.sign(authTokens, ClientSecret, { expiresIn: TokenValidTime });
  }

  public async getUser() {
    return await this.DiscordApi.getUserInfo();
  }

  public static decodeToken(token: string) {
    if (!token || token === '') return {} as IAuthTokens;
    return jwt.verify(token, ClientSecret) as IAuthTokens;
  }
}