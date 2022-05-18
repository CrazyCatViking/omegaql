import DiscordUserApi from "dataSources/DiscordUserApi";
import DiscordBotApi from 'dataSources/DiscordBotApi';
import FFXIVApi from "../dataSources/FFXIVApi";
import OmegaDb from "../dataSources/OmegaDb";
import AuthModel from "./models/AuthModel";
import FFXIVModel from "./models/FFXIVModel";
import GuildModel from "./models/GuildModel";
import PollModel from "./models/PollModel";
import TwitchApi from "dataSources/TwitchApi";
import TwitchModel from "./models/TwitchModel";

enum PollStatus {
  New,
  Posted,
  Ended,
}

export interface IServices {
  OmegaDb: OmegaDb;
  FFXIVApi: FFXIVApi;
  DiscordUserApi: DiscordUserApi;
  DiscordBotApi: DiscordBotApi;
  TwitchApi: TwitchApi;
}

export interface IModels {
  AuthModel: AuthModel;
  GuildModel: GuildModel;
  PollModel: PollModel;
  FFXIVModel: FFXIVModel;
  TwitchModel: TwitchModel;
}

export type IDataSources = IServices & IModels;

export interface IAuthTokens {
  discordUserToken: Record<string, any>;
  discordBotToken: Record<string, string>;
  guildContext: string;
  twitchToken: string;
}

export interface IContext {
  req: any;
  res: any;
  decodedTokens: IAuthTokens;
  dataSources: IDataSources;
}

export interface IWsContext {
  req: any;
  socket: any;
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

export interface IFFXIVInput {
  discordId: string;
  ffxivId: string;
}