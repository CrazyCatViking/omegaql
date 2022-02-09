import BaseModel from "./BaseModel";

export default class GuildModel extends BaseModel {
  public async getGuilds() {
    const data = await this.DiscordApi.getGuilds();
    return { items: data };
  }

  public async getGuild(guildId: string) {
    const data = await this.DiscordApi.getGuilds();
    return data.find((item: any) => item.id === guildId);
  }
}