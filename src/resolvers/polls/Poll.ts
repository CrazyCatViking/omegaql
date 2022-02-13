import dataSources from "@/dataSources";
import { defineResolver } from "../helpers";

export const options = defineResolver(async (obj, _, { dataSources: { PollModel } }) => {
  if (obj.status !== 'Posted') {
    return obj.options.map((item: string) => ({
      name: item,
    }));
  };

  const pollVotes = await PollModel.getPollVotes(obj.pollMessageData);
  
  return obj.options.map((item: string, index: number) => ({
    name: item,
    votes: pollVotes[index],
  }))
});