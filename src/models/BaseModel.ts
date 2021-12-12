import { IServices } from "@/types";
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
}