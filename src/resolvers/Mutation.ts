import { defineResolver } from "./helpers"
import { IFFXIVInput, IPollInput } from "@/types"

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

export const setCharacter = defineResolver((_, args: IFFXIVInput, { dataSources: { FFXIVModel } }) => {
  return FFXIVModel.setCharacter(args);
});

export const enableExtension = defineResolver((_, args, { dataSources: { FFXIVModel } }) => {
  return FFXIVModel.enableExtensions();
});

export const login = defineResolver(async (_, { authCode }, { res, dataSources: { AuthModel } }) => {
  const authToken = await AuthModel.login(authCode);
  res.cookie('authToken', authToken, { domain: process.env.DOMAIN_NAME, httpOnly: true, secure: true, sameSite: 'none' });

  return true;
}); 

export const changeGuildContext = defineResolver(async (_, { guildId }, { dataSources: { AuthModel, GuildModel }, res, decodedTokens} ) => {
  const authToken = await AuthModel.changeGuildContext(decodedTokens, guildId);
  res.cookie('authToken', authToken, { domain: process.env.DOMAIN_NAME, httpOnly: true, secure: true, sameSite: 'none' });

  return true;
});