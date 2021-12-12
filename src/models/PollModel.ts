import { IPollInput } from "@/types";
import BaseModel from "./BaseModel";

export default class PollModel extends BaseModel {
  public async getPolls() {
    const { polls } = await this.OmegaDb.getPolls();
    return polls;
  }

  public async enablePollExtension() {
    const isEnabled = await this.OmegaDb.pollExtensionIsEnabled();
    if (isEnabled) return true;

    const defaultPollData = {
      polls: [],
    };

    const res = await this.OmegaDb.enablePollExtension(defaultPollData);
    return !!res.insertedId;
  }

  public async createPoll(input: IPollInput) {
    const { polls } = await this.OmegaDb.getPolls();

    const pollIndex = polls.findIndex((item: any) => item.id === input.id);

    if (pollIndex !== -1) {
      throw (`Poll with id ${input.id}, already exists in db`);
    }

    polls.push(input);
    await this.OmegaDb.updatePolls(polls);

    return polls;
  }

  public async updatePoll(input: IPollInput) {
    const { polls } = await this.OmegaDb.getPolls();

    const pollIndex = polls.findIndex((item: any) => item.id === input.id);
    
    if (pollIndex === -1) {
      throw (`Poll with id ${input.id}, does not exist in db`)
    }

    polls[pollIndex] = input;
    await this.OmegaDb.updatePolls(polls);

    return polls[pollIndex];
  }

  public async deletePoll(pollId: string) {
    const { polls } = await this.OmegaDb.getPolls();
    const pollIndex = polls.findIndex((item: any) => item.id === pollId);

    if (pollIndex !== -1) {
      polls.splice(pollIndex, 1);
    } else {
      throw('Poll does not exist in db');
    }

    const res = await this.OmegaDb.updatePolls(polls);
    
    return !!res.modifiedCount;
  }
}