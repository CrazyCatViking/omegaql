import AuthModel from "./models/AuthModel";
import dataSources from "./dataSources";
import { IContext } from "./types";

const getAuthorizationToken = (req: any) => {
  if (req.headers.authorization) {
    return req.headers.authorization;
  }

  if (req.headers.cookie?.includes('authToken=')) {
    return req.headers.cookie.replace('authToken=', '');
  }

  return '';
}

export default (req: any, res: any): IContext => {
  const jwtToken = getAuthorizationToken(req);
  const decodedTokens = {
    ...AuthModel.decodeToken(jwtToken),
    discordBotToken: {
      access_token: process.env.DISCORD_BOT_TOKEN,
      token_type: 'Bot', 
    },
  };

  return {
    req,
    res,
    decodedTokens,
    dataSources: dataSources(decodedTokens),
  };
}