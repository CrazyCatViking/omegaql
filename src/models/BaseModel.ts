import { IServices } from "@/types";
import DiscordUserApi from "dataSources/DiscordUserApi";
import DiscordBotApi from 'dataSources/DiscordBotApi';
import FFXIVApi from "dataSources/FFXIVApi";
import OmegaDb from "dataSources/OmegaDb";

export default class BaseModel {
  services: IServices;
  
  constructor(services: IServices) {
    this.services = services;
  }

  protected get OmegaDb(): OmegaDb {
    return this.services.OmegaDb;
  }
  
  protected get FFXIVApi(): FFXIVApi {
    return this.services.FFXIVApi;
  }

  protected get DiscordUserApi(): DiscordUserApi {
    return this.services.DiscordUserApi;
  }

  protected get DiscordBotApi(): DiscordBotApi {
    return this.services.DiscordBotApi;
  }
}