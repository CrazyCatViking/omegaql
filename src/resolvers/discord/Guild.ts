import { defineResolver } from "../helpers";

const lazyResolve = (fieldName: string) => defineResolver(async (obj, args, { dataSources: { GuildModel } }) => {
  if (obj[fieldName] != null) return obj[fieldName];
  if (obj.id == null) throw new Error('Cannot lazyResolve field, missing guild id');

  const guild = await GuildModel.getGuild();
  return guild[fieldName];
});

export const name = lazyResolve('name');
export const icon = lazyResolve('icon');