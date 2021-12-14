import { CSV, IXIVApiGetParams } from "dataSources/FFXIVApiSource";
import BaseModel from "./BaseModel";

export interface IGetCharacterParams {
  id?: number;
  name?: string;
  server?: string;
  data?: CSV;
}

export default class FFXIVModel extends BaseModel {
  public async getCharacter({ id, name, server, data }: IGetCharacterParams) {
    let character: any;

    if (id) {
      const res = await this.FFXIVApi.getCharacter(id);
      character = res;
    } else {
      const { Results } = await this.FFXIVApi.findCharacter(name, server);

      if (!Results) throw('found no character with matching name on server'); // More descriptive error message

      const params: IXIVApiGetParams = {
        extended: true,
        data,
      };

      const res = await this.FFXIVApi.getCharacter(Results[0].ID, params);
      character = res;
    }

    return character;
  }

  public async findCharacter(name: string, server: string) {
    const res = await this.FFXIVApi.findCharacter(name, server);
    console.log(res);

    return res.character;
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
}