import { IAuthTokens } from '@/types';
import jwt from 'jsonwebtoken';
import BaseModel from './BaseModel';

const ClientSecret = process.env.CLIENT_SECRET;
const TokenValidTime = '30m';

export default class AuthModel extends BaseModel {
  public login(payload: Record<string, string>) {
    return jwt.sign(payload, ClientSecret, { expiresIn: TokenValidTime });
  }

  public static decodeToken(token: string) {
    return jwt.verify(token, ClientSecret) as IAuthTokens;
  }
}