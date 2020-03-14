import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { typeDef as Hello, resolvers as helloResolvers } from './Hello';

const Query = `
  type Query {
    _empty: String
  }
`;

const resolvers = {};

export default makeExecutableSchema({
  typeDefs: [Query, Hello],
  resolvers: merge(resolvers, helloResolvers),
});
