import BaseModel from "./BaseModel";

export default class GuildModel extends BaseModel {
  public async getGuilds() {
    const data =  await this.DiscordApi.getGuilds();
    return { items: data };
  }
}