import FFXIVApiSource, { IXIVApiGetParams } from "./FFXIVApiSource";

export default class FFXIVApi extends FFXIVApiSource {
  public async findCharacter(name: string, server: string) {
    return await this.character.search(name, { server });
  }

  public async getCharacter(id: number, params?: IXIVApiGetParams) {
    return await this.character.get(id, params);
  }

  public async getAllMounts() {
    return await this.data.list('Mount', { limit: 30000 });
  }

  public async getAllMinions() {
    return await this.data.list('Companion', { limit: 3000 });
  }
}