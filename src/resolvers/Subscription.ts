import { IWsContext } from '@/types';
import { pubSub } from '../useRedisPubSub';

export const liveStreamFeed = {
  subscribe: (parent, args, context: IWsContext) => {
    const guildContext = context.decodedTokens.guildContext;
    return pubSub.asyncIterator([`twitch-stream-live-feed.${guildContext}`]);
  },
};