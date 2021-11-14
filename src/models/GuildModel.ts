import BaseModel from "./BaseModel";

export default class GuildModel extends BaseModel {
  public async getPolls() {
    const { document } = await this.OmegaDb.getPolls();

    return document;
  }
}