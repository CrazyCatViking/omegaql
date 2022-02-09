import { IAuthTokens } from '@/types';
import jwt from 'jsonwebtoken';
import BaseModel from './BaseModel';

const ClientSecret = process.env.CLIENT_SECRET;
const TokenValidTime = '8h'; // This needs to be changed, use redis to invalidate tokens?

export default class AuthModel extends BaseModel {
  public async login(authCode: string) {
    const discordToken = await this.DiscordApi.login(authCode);

    const authTokens = {
      discordToken,
    };

    return jwt.sign(authTokens, ClientSecret, { expiresIn: TokenValidTime });
  }

  public async getSelf() {
    return await this.DiscordApi.getUserInfo();
  }

  public async changeGuildContext(authTokens: IAuthTokens, guildId: bigint) {
    const newTokens = {
      ...authTokens,
      dbContext: guildId.toString(),
    };

    return jwt.sign(newTokens, ClientSecret);
  }

  public static decodeToken(token: string) {
    if (!token || token === '') return {} as IAuthTokens;
    return jwt.verify(token, ClientSecret) as IAuthTokens;
  }
}