import FFXIVApiSource from "./FFXIVApiSource";

export default class FFXIVApi extends FFXIVApiSource {
  public async findCharacter(name: string, server: string) {
    return await this.character.search(name, { server });
  }

  public async getCharacter(id: number) {
    return await this.character.get(id);
  }
}