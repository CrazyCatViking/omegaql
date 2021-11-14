import { DocumentNode } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import gql from 'graphql-tag';

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import resolvers from './resolvers';

export const makeSchema = () => {
  return makeExecutableSchema({
      typeDefs: loadSchema(),
      resolvers,
    });
}

export const loadSchema = (): DocumentNode[] => {
  const relPath = join(__dirname, '../schema');
  return readdirSync(relPath).map(filename => 
    gql(readFileSync(join(relPath, filename)).toString()));
};