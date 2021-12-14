import * as Query from './resolvers/Query';
import * as Mutation from './resolvers/Mutation';
import FFXIVResolvers from './resolvers/ffxivResolvers';

const resolvers = {
  Query,
  Mutation,
  ...FFXIVResolvers,
}

export default resolvers;