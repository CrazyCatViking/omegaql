import OmegaDb from "dataSources/OmegaDb";
import AuthModel from "./models/AuthModel";
import GuildModel from "./models/GuildModel";

export interface IServices {
  OmegaDb: OmegaDb,
}

export interface IModels {
  AuthModel: AuthModel,
  GuildModel: GuildModel,
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