import { defineResolver } from "../helpers";

const lazyResolve = (fieldName: string) => defineResolver(async (obj, args, { dataSources: { GuildModel } }) => {
  if (obj[fieldName] != null) return obj[fieldName];
  if (obj.id == null) throw new Error('Cannot lazyResolve field, missing guild id');

  const guild = await GuildModel.getGuild(obj.id);
  return guild.name;
});

export const name = lazyResolve('name');