import { GraphQLScalarType, Kind } from 'graphql';
import { encodeHashId, decodeHashId } from '../utility/hashIds';

export default new GraphQLScalarType({
  name: 'HashId',

  serialize: (value: any) => {
    return encodeHashId(value);
  },

  parseValue: (value) => {
    if (typeof value !== 'string') throw new Error(`Could not parse hashId, expected string, got type ${typeof value}`);
    return decodeHashId(value)[0];
  },

  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) throw new Error(`Could not parse hashId, expected StringValue, got type ${ast.kind}`);
    return decodeHashId(ast.value)[0];
  },
});