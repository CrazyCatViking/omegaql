import { IAuthTokens, IDataSources } from "./types";

import OmegaDb from "../dataSources/OmegaDb";
import FFXIVApi from "../dataSources/FFXIVApi";
import DiscordUserApi from "../dataSources/DiscordUserApi";
import DiscordBotApi from '../dataSources/DiscordBotApi';
import TwitchApi from '../dataSources/TwitchApi';

import GuildModel from "./models/GuildModel";
import AuthModel from "./models/AuthModel";
import PollModel from "./models/PollModel";
import FFXIVModel from "./models/FFXIVModel";
import TwitchModel from './models/TwitchModel';

export default ({ 
  discordUserToken,
  discordBotToken,
  guildContext,
  twitchToken,
}: IAuthTokens): IDataSources => {
  const services = {
    OmegaDb: new OmegaDb(guildContext),
    FFXIVApi: new FFXIVApi(),
    DiscordUserApi: new DiscordUserApi(discordUserToken),
    DiscordBotApi: new DiscordBotApi(discordBotToken, guildContext),
    TwitchApi: new TwitchApi(twitchToken),
  };

  const models = {
    AuthModel: new AuthModel(services),
    GuildModel: new GuildModel(services),
    PollModel: new PollModel(services),
    FFXIVModel: new FFXIVModel(services),
    TwitchModel: new TwitchModel(services),
  };

  return {...services, ...models};
};