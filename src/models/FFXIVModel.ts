import BaseModel from "./BaseModel";

export interface IGetCharacterParams {
  id?: number;
  name?: string;
  server?: string;
}

export default class FFXIVModel extends BaseModel {
  public async getCharacter({ id, name, server }: IGetCharacterParams) {
    let character: any;

    if (id) {
      const res = await this.FFXIVApi.getCharacter(id);
      character = res;
    } else {
      const { Results } = await this.FFXIVApi.findCharacter(name, server);

      if (!Results) throw('found no character with matching name on server'); // More descriptive error message

      const res = await this.FFXIVApi.getCharacter(Results[0].ID);
      character = res;
    }

    return character;
  }

  public async findCharacter(name: string, server: string) {
    const res = await this.FFXIVApi.findCharacter(name, server);
    console.log(res);

    return res.character;
  }
}