import RESTSource from "./RESTSource";

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
}