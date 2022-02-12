import { IAuthTokens } from '@/types';
import jwt from 'jsonwebtoken';
import BaseModel from './BaseModel';

const ClientSecret = process.env.CLIENT_SECRET;
const TokenValidTime = '8h'; // This needs to be changed, use redis to invalidate tokens?

export default class AuthModel extends BaseModel {
  public async login(authCode: string) {
    const discordUserToken = await this.DiscordUserApi.login(authCode);

    const authTokens = {
      discordUserToken,
    };

    return jwt.sign(authTokens, ClientSecret, { expiresIn: TokenValidTime });
  }

  public async getSelf() {
    return await this.DiscordUserApi.getUserInfo();
  }

  public async changeGuildContext(authTokens: IAuthTokens, guildId: bigint) {
    const newTokens = {
      ...authTokens,
      guildContext: guildId.toString(),
    };

    return jwt.sign(newTokens, ClientSecret);
  }

  public static decodeToken(token: string) {
    if (!token || token === '') return {} as IAuthTokens;
    return jwt.verify(token, ClientSecret) as IAuthTokens;
  }
}