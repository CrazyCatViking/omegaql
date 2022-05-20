import RESTSource from "./RESTSource";
import { 
  ICurrentTwitchSubscriptions,
  ITwitchSubscriptionTransport, 
  ITwitchUserResult,
  ITwitchWebhookPayload
} from "./types";

const TWITCH_API_URL = 'https://api.twitch.tv/helix';

export default class TwitchDataSource extends RESTSource {
  constructor(twitchToken: string) {
    super(
      TWITCH_API_URL,
      { 
        authorization: twitchToken,
        'client-id': process.env.TWITCH_CLIENT_ID,
      },
      {
        cacheOptions: {
          useCache: false,
          cacheLifetime: 0,
        },
      },
    );
  }

  public async getStreams() {
    return this.get({ url: 'streams' });
  }

  public async getUserByName(userName: string): Promise<ITwitchUserResult> {
    return this.get({ url: 'users', params: { login: userName } })
  }

  public async getWebhookSubscriptions(): Promise<ICurrentTwitchSubscriptions> {
    return this.get({ url: 'eventsub/subscriptions' });
  }

  public async createWebhookSubscription(payload: ITwitchWebhookPayload) {
    const transport: ITwitchSubscriptionTransport = {
      method: 'webhook',
      callback: `https://omegaql.${process.env.DOMAIN_NAME}/hooks/twitch`,
      secret: process.env.TWITCH_WEBHOOK_SECRET,
    };

    return this.post({ url: 'eventsub/subscriptions', params: { ...payload, transport }});
  }
}