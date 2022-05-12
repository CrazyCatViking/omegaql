import axios from "axios";

const TWITCH_OAUTH_URL = 'https://id.twitch.tv/oauth2'

let accessToken = '';

export const twitchConnect = async () => {
  const res = await axios({
    url: `${TWITCH_OAUTH_URL}/token`,
    method: 'post',
    data: {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials'
    },
  });

  const token = res.data.access_token;
  accessToken = `Bearer ${token}`;
};

export const useTwitchConnection = async () => {
  try {
    await axios({
      url: `${TWITCH_OAUTH_URL}/validate`,
      method: 'get',
      headers: {
        authorization: accessToken + 'd',
      },
    });

    return accessToken;
  } catch {
    await twitchConnect();
    return accessToken;
  }
};