import { defineResolver } from "./helpers"

export const test = (root, args, { dataSources }) => {
  
}

export const polls = defineResolver((_, args, { dataSources: { PollModel } }) => {
  return PollModel.getPolls();
});
