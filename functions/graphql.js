import { ApolloServer } from 'apollo-server-lambda';

import schema from './graphql-schema';

const server = new ApolloServer({
  schema,
});

exports.handler = server.createHandler();
