import type { GatsbyBrowser } from 'gatsby';

import { Fragment } from 'react';

import 'normalize.css';

import { ThemeContextProvider } from './src/context/Theme';
import EmotionThemeProvider from './src/theme/EmotionThemeProvider';

import ThemeGlobalCSSProperties from './src/theme/ThemeGlobalCSSProperties';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
  <Fragment>
    <ThemeGlobalCSSProperties />
    <ThemeContextProvider>
      <EmotionThemeProvider>{element}</EmotionThemeProvider>
    </ThemeContextProvider>
  </Fragment>
);
