import RESTSource from "./RESTSource";

const DISCORD_API_URL = 'https://discord.com/api';

export default class DiscordApi extends RESTSource {
  token: Record<string, any>;

  constructor(authToken: Record<string, any>) {
    super(
      DISCORD_API_URL, 
      { authorization: `${authToken?.token_type} ${authToken?.access_token}` },
      {
        cacheOptions: {
          useCache: true,
          cacheLifetime: 60,
        },
      }
    );
    this.token = authToken;
  }

  public async login(authCode: string) {
    const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;
    const discordRedirectUrl = process.env.DISCORD_REDIRECT_URL;
    const discordClientId = process.env.DISCORD_CLIENT_ID;

    const params = {
      client_id: discordClientId,
      client_secret: discordClientSecret,
      code: authCode,
      grant_type: 'authorization_code',
      redirect_uri: discordRedirectUrl,
      scope: 'identify guilds',
    };

    return await this.post({ url: 'oauth2/token', params }, { cachePolicy: 'no-cache' });
  }

  public async getUserInfo() {
    return this.get({ url: 'users/@me' });
  }

  public async getGuilds() {
    return this.get({ url: 'users/@me/guilds' });
  }
}