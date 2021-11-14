import OmegaDb from "dataSources/OmegaDb";
import AuthModel from "./models/AuthModel";
import GuildModel from "./models/GuildModel";
import PollModel from "./models/PollModel";

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