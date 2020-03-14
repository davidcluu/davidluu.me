/* eslint-disable */

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import ContextProvider from './src/context';
import ThemeProvider from './src/theme';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: '/.netlify/functions/graphql',
  }),
});

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <ThemeProvider>{element}</ThemeProvider>
      </ContextProvider>
    </ApolloProvider>
  );
};
