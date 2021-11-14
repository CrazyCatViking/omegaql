import { defineResolver } from "./helpers"

export const test = (root, args, { dataSources }) => {
  
}

export const guild = defineResolver((root, args, { dataSources: { GuildModel } }) => {
  return GuildModel.getPolls();
});