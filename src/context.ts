import AuthModel from "./models/AuthModel";
import dataSources from "./dataSources";
import { IContext, IWsContext } from "./types";
import { useTwitchConnection } from "./twitch";

const getAuthorizationToken = (headers: any) => {
  if (headers.authorization) {
    return headers.authorization;
  }

  if (headers.cookie?.includes('authToken=')) {
    return headers.cookie.replace('authToken=', '');
  }

  return '';
}

export default async (req: any, res: any): Promise<IContext> => {
  const jwtToken = getAuthorizationToken(req?.headers);
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

export const wsContext = async (req: any, socket: any, connectionParams: Record<string, any>): Promise<IWsContext> => {
  const jwtToken = getAuthorizationToken(connectionParams.headers);
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
    socket,
    decodedTokens,
    dataSources: dataSources(decodedTokens),
  }
}