/* eslint-disable */

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import ContextProvider from './src/context';
import ThemeProvider from './src/theme';

export const wrapRootElement = ({ element }) => {
  return (
    <ContextProvider ssr>
      <ThemeProvider>
        {element}
      </ThemeProvider>
    </ContextProvider>
  );
};
