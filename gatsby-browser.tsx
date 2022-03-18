import type { GatsbyBrowser } from 'gatsby';

import 'normalize.css';

import EmotionThemeProvider from './src/theme/EmotionThemeProvider';

import EmotionThemeGlobalCSSProperties from './src/theme/EmotionThemeGlobalCSSProperties';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
  <ReduxProvider store={store}>
    <EmotionThemeProvider>
      <EmotionThemeGlobalCSSProperties />
      {element}
    </EmotionThemeProvider>
  </ReduxProvider>
);
