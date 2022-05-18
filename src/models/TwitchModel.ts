import BaseModel from "./BaseModel";

export default class TwitchModel extends BaseModel {
  public async getStreams() {
      const data = await this.TwitchApi.getStreams();
      return { items: data, totalCount: 100 };
  }

  public async addStream() {

  }

  public async checkStreams() {

  }

  public async addChannelSubscription() {

  }
}