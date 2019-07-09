/* eslint-disable */

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import ContextProvider from './src/context';
import ThemeProvider from './src/theme';

export const wrapRootElement = ({ element }) => {
  return (
    <ContextProvider>
      <ThemeProvider>
        {element}
      </ThemeProvider>
    </ContextProvider>
  );
};
