import { defineResolver } from "./helpers";

export const guildContext = defineResolver((obj, _, { decodedTokens }) => {
  if (!decodedTokens.guildContext) return undefined;

  return {
    id: decodedTokens.guildContext,
  };
});

export const availableGuilds = defineResolver(async (obj, _, { dataSources: { GuildModel } }) => {
  return (await GuildModel.getGuilds()).items;
});

export const avatar = defineResolver((obj) => {
  const discordCdn = process.env.DISCORD_CDN;
  return `${discordCdn}/avatars/${obj.id}/${obj.avatar}.png`;
});