import { IAuthTokens, IDataSources } from "./types";

import OmegaDb from "../dataSources/OmegaDb";
import GuildModel from "./models/GuildModel";
import AuthModel from "./models/AuthModel";
import PollModel from "./models/PollModel";

export default ({ discordToken, dbContext }: IAuthTokens): IDataSources => {
  const services = {
    OmegaDb: new OmegaDb(dbContext),
  };

  const models = {
    AuthModel: new AuthModel(services),
    GuildModel: new GuildModel(services),
    PollModel: new PollModel(services),
  };

  return {...services, ...models};
};