/* eslint-disable */

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import DarkModeProvider from './src/components/DarkModeProvider';

export const wrapRootElement = ({ element }) => {
  return (
    <DarkModeProvider>
      {element}
    </DarkModeProvider>
  );
};
