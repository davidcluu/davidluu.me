import type { GatsbyBrowser } from 'gatsby';

import { Fragment } from 'react';

import 'normalize.css';

import EmotionThemeProvider from './src/theme/EmotionThemeProvider';

import ThemeGlobalCSSProperties from './src/theme/ThemeGlobalCSSProperties';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
  <Fragment>
    <ThemeGlobalCSSProperties />
    <ReduxProvider store={store}>
      <EmotionThemeProvider>{element}</EmotionThemeProvider>
    </ReduxProvider>
  </Fragment>
);
