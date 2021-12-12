import MongoDbSource from "./MongoDbSource";

export default class OmegaDb extends MongoDbSource {
  public async getGuildSettings() {
    return await this.getDocument('guildSettings');
  }

  public async getPolls() {
    return await this.getDocument('extension/pollExtension');
  }

  public async pollExtensionIsEnabled() {
    return await this.hasDocument('extension/pollExtension');
  }

  public async enablePollExtension(input: Record<string, unknown>) {
    return await this.insertDocument('extension/pollExtension', input);
  }

  public async updatePolls(input: Record<string, unknown>) {
    return await this.updateDocument('extension/pollExtension', { polls: input });
  }
}