import OmegaDb from "dataSources/OmegaDb";
import AuthModel from "./models/AuthModel";
import GuildModel from "./models/GuildModel";
import PollModel from "./models/PollModel";

enum PollStatus {
  New,
  Posted,
  Ended,
}

export interface IServices {
  OmegaDb: OmegaDb,
}

export interface IModels {
  AuthModel: AuthModel,
  GuildModel: GuildModel,
  PollModel: PollModel,
}

export type IDataSources = IServices & IModels;

export interface IAuthTokens {
  discordToken: string,
  dbContext: string,
}

export interface IContext {
  decodedTokens: IAuthTokens;
  dataSources: IDataSources;
}

export interface IPollInput extends Record<string, unknown> {
  id: string;
  mode: string;
  description: string;
  options: string[];
  status: PollStatus;
  pollMessageData?: IPollMessageData;
}

export interface IPollMessageData {
  messageId?: string;
  channelId?: string;
}