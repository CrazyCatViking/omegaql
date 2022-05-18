import * as Query from './resolvers/Query';
import * as Mutation from './resolvers/Mutation';
import * as Subscription from './resolvers/Subscription';
import * as Self from './resolvers/Self';
import FFXIVResolvers from './resolvers/ffxivResolvers';
import Discord from './resolvers/discord';
import HashId from './resolvers/HashId';
import Polls from './resolvers/polls';


const resolvers = {
  HashId,

  Query,
  Mutation,
  Subscription,
  Self,
  ...FFXIVResolvers,
  ...Discord,
  ...Polls,
}

export default resolvers;