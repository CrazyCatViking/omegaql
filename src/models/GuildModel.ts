import BaseModel from "./BaseModel";

export default class GuildModel extends BaseModel {
  public async getGuilds() {
    const data = await this.DiscordUserApi.getGuilds();
    return { items: data };
  }

  public async getBotGuilds(): Promise<any[]> {
    return this.DiscordBotApi.getGuilds();
  }

  public async getGuild() {
    const guild = await this.DiscordBotApi.getGuild();
    const discordCdn = process.env.DISCORD_CDN;

    return {
      ...guild,
      icon: `${discordCdn}/icons/${guild.id}/${guild.icon}.png`,
    };
  }
}