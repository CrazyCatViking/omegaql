import BaseModel from "./BaseModel";

export default class PollModel extends BaseModel {
  public async getPolls() {
    const { document } = await this.OmegaDb.getPolls();

    const polls = Object.values(document.polls);

    return polls;
  }
}