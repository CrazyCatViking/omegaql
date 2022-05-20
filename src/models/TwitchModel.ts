import { SubscriptionTypes } from "../../dataSources/types";
import BaseModel from "./BaseModel";

export default class TwitchModel extends BaseModel {
  public async getStreams() {
      const data = await this.TwitchApi.getStreams();
      return { items: data, totalCount: 100 };
  }

public async subscribeToChannel(channelName: string) {
  console.log(channelName);

  const result = await this.TwitchApi.getUserByName(channelName);
  const currentSubscriptions = await this.TwitchApi.getWebhookSubscriptions();

  if (!result.data?.length) throw 'Could not find channel';
  const twitchUser = result.data[0];

  const twitchId = twitchUser.id;
  const hasSubscription = currentSubscriptions.data.some((sub) => (
    sub.type === SubscriptionTypes.streamsOnline &&
    sub.condition.broadcaster_user_id === twitchId
  ));

  if (!hasSubscription) await this.TwitchApi.createWebhookSubscription({
    type: SubscriptionTypes.streamsOnline,
    version: '1',
    condition: {
      broadcaster_user_id: twitchId,
    },
  });

  console.log(hasSubscription);

  console.log(twitchUser);
  console.log(currentSubscriptions);
  return true;
}

  public async addStream() {

  }

  public async checkStreams() {

  }

  public async addChannelSubscription() {

  }
}