import MongoDbSource from "./MongoDbSource";

export default class OmegaDb extends MongoDbSource {
  public async getGuildSettings() {
    return await this.getDocument('guildSettings');
  }

  public async getPolls() {
    return await this.getDocument('extension/pollExtension');
  }
}