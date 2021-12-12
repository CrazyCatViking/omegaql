import { defineResolver } from "./helpers"
import { IPollInput } from "@/types"

export const createPoll = defineResolver((_, { input }: { input: IPollInput }, { dataSources: { PollModel } }) => {
  return PollModel.createPoll(input);
});

export const enablePollExtension = defineResolver((_, args, { dataSources: { PollModel } }) => {
  return PollModel.enablePollExtension();
});

export const updatePoll = defineResolver((_, { input }: { input: IPollInput }, { dataSources: { PollModel } }) => {
  return PollModel.updatePoll(input);
});

export const deletePoll = defineResolver((_, { id }: { id: string }, { dataSources: { PollModel } }) => {
  return PollModel.deletePoll(id);
});