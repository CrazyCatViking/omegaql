import { IFFXIVInput } from "@/types";
import { CSV, IXIVApiGetParams } from "dataSources/FFXIVApiSource";
import BaseModel from "./BaseModel";

export interface IGetCharacterParams {
  discordId?: string;
  name?: string;
  server?: string;
  data?: CSV;
}

export default class FFXIVModel extends BaseModel {
  public async getCharacter({ discordId, name, server, data }: IGetCharacterParams) {
    let character: any;

    const { profiles } = await this.OmegaDb.getFFXIVCharacters();
    const ffxivId = profiles[discordId];
    
    const params: IXIVApiGetParams = {
      extended: true,
      data,
    };

    if (ffxivId) {
      const res = await this.FFXIVApi.getCharacter(ffxivId, params);
      character = res;
    } else {
      const { Results } = await this.FFXIVApi.findCharacter(name, server);

      if (!Results) throw('found no character with matching name on server'); // More descriptive error message

      const res = await this.FFXIVApi.getCharacter(Results[0].ID, params);
      character = res;
    }

    return character;
  }

  public async findCharacter(name: string, server: string) {
    const { Results } = await this.FFXIVApi.findCharacter(name, server);
    return Results;
  }

  public async setCharacter({ discordId, ffxivId }: IFFXIVInput) {
    const { profiles } = await this.OmegaDb.getFFXIVCharacters();
    profiles[discordId] = ffxivId;

    const res = await this.OmegaDb.updateFFXIVCharacters(profiles);

    return !!res.modifiedCount;
  }

  // This takes too long, this should be only fetched some times
  public async getAllMounts(): Promise<unknown[]> {
    const { Results } = await this.FFXIVApi.getAllMounts();
    return Results.filter((item: any) => item.Name !== '');
  }

  public async getAllMinions(): Promise<unknown[]> {
    const { Results } = await this.FFXIVApi.getAllMinions();
    return Results.filter((item: any) => item.Name !== '');
  }

  public async enableExtensions() {
    const isEnabled = await this.OmegaDb.ffxivExtensionIsEnabled();
    if (isEnabled) return true;

    const defaultFFXIVData = {
      profiles: {},
    };

    const res = await this.OmegaDb.enableFFXIVExtension(defaultFFXIVData);
    return !!res.insertedId;
  }
}