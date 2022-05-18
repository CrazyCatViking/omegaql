import { IGetCharacterParams } from "@/models/FFXIVModel";
import { defineResolver } from "./helpers"
import { pubSub } from "../useRedisPubSub";

export const polls = defineResolver((_, args, { dataSources: { PollModel } }) => {
  return PollModel.getPolls();
});

export const getCharacter = defineResolver((_, { input }: { input:  IGetCharacterParams }, { dataSources: { FFXIVModel } }) => {
  return FFXIVModel.getCharacter(input);
});

export const findCharacter = defineResolver((_, { name, server }: { name: string, server: string }, { dataSources: { FFXIVModel } }) => {
  return FFXIVModel.findCharacter(name, server);
});

export const self = defineResolver((_, args, { dataSources: { AuthModel }, decodedTokens }) => {
  if (!decodedTokens.discordUserToken) return undefined;
  return AuthModel.getSelf();
});

export const guilds = defineResolver((_, args, { dataSources: { GuildModel } }) => {
  return GuildModel.getGuilds();
});

export const twitchStreams = defineResolver((_, args, { dataSources: { TwitchModel } }) => {
  pubSub.publish('TEST', { test: 'test' });
  return TwitchModel.getStreams();
});
