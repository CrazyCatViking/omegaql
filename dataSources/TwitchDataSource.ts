import axios from "axios";
import RESTSource from "./RESTSource";

const TWITCH_API_URL = 'https://api.twitch.tv/helix/';
const TWITCH_OAUTH_URL = 'https://id.twitch.tv/oauth2/token'

export default class TwitchDataSource extends RESTSource {
  constructor() {
    super(
      TWITCH_API_URL,
      { authorization: undefined },
      {
        cacheOptions: {
          useCache: false,
          cacheLifetime: 0,
        },
      },
    );

    this.init();
  }

  async init() {
    const res = await axios({
      url: TWITCH_OAUTH_URL,
      method: 'post',
      data: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials'
      },
    });

    const accessToken = res.data.access_token;
    this.headers = { authorization: `Bearer ${accessToken}` };
  }
}