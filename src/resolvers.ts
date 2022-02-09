import * as Query from './resolvers/Query';
import * as Mutation from './resolvers/Mutation';
import * as Self from './resolvers/Self';
import FFXIVResolvers from './resolvers/ffxivResolvers';
import Discord from './resolvers/discord';
import HashId from './resolvers/HashId';


const resolvers = {
  HashId,

  Query,
  Mutation,
  Self,
  ...FFXIVResolvers,
  ...Discord,
}

export default resolvers;