import AuthModel from "./models/AuthModel";
import dataSources from "./dataSources";
import { IContext } from "./types";
import { useTwitchConnection } from "./twitch";

const getAuthorizationToken = (req: any) => {
  if (req.headers.authorization) {
    return req.headers.authorization;
  }

  if (req.headers.cookie?.includes('authToken=')) {
    return req.headers.cookie.replace('authToken=', '');
  }

  return '';
}

export default async (req: any, res: any): Promise<IContext> => {
  const jwtToken = getAuthorizationToken(req);
  const twitchToken = await useTwitchConnection();

  const decodedTokens = {
    ...AuthModel.decodeToken(jwtToken),
    discordBotToken: {
      access_token: process.env.DISCORD_BOT_TOKEN,
      token_type: 'Bot', 
    },
    twitchToken,
  };

  return {
    req,
    res,
    decodedTokens,
    dataSources: dataSources(decodedTokens),
  };
}