import RESTSource from "./RESTSource";

const DISCORD_API_URL = 'https://discord.com/api';

export default class DiscordBotApi extends RESTSource {
  token: Record<string, any>;
  guildContext: string;

  constructor(authToken: Record<string, any>, guildContext: string) {
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
    this.guildContext = guildContext;
  }

  public async getGuild() {
    return this.get({ url: `guilds/${this.guildContext}` });
  }
}