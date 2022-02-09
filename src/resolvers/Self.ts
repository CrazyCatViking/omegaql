import { defineResolver } from "./helpers";

export const guildContext = defineResolver((obj, _, { decodedTokens }) => {
  if (!decodedTokens.dbContext) return undefined;

  return {
    id: decodedTokens.dbContext,
  };
});

export const availableGuilds = defineResolver(async (obj, _, { dataSources: { GuildModel } }) => {
  return (await GuildModel.getGuilds()).items;
});