import { IAuthTokens, IDataSources } from "./types";

import OmegaDb from "../dataSources/OmegaDb";
import FFXIVApi from "../dataSources/FFXIVApi";

import GuildModel from "./models/GuildModel";
import AuthModel from "./models/AuthModel";
import PollModel from "./models/PollModel";
import FFXIVModel from "./models/FFXIVModel";

export default ({ discordToken, dbContext }: IAuthTokens): IDataSources => {
  const services = {
    OmegaDb: new OmegaDb(dbContext),
    FFXIVApi: new FFXIVApi(),
  };

  const models = {
    AuthModel: new AuthModel(services),
    GuildModel: new GuildModel(services),
    PollModel: new PollModel(services),
    FFXIVModel: new FFXIVModel(services),
  };

  return {...services, ...models};
};