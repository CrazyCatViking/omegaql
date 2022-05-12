import BaseModel from "./BaseModel";

export default class TwitchModel extends BaseModel {
  async getStreams() {
    try {
      const data = await this.TwitchApi.getStreams();
      console.log(data);
      return { items: data, totalCount: 100 };
    } catch (ex) {
      console.log(ex);
    }

  };
}