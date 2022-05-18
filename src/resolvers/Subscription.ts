import { pubSub } from '../useRedisPubSub';

export const test = {
  subscribe: (parent, args, context) => {
    return pubSub.asyncIterator(['TEST']);
  },
};