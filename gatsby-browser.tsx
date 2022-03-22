import type { GatsbyBrowser } from 'gatsby';

import { Provider as ReduxProvider } from 'react-redux';

import 'normalize.css';

import EmotionThemeProvider from './src/theme/EmotionThemeProvider';

import EmotionThemeGlobalCSSProperties from './src/theme/EmotionThemeGlobalCSSProperties';
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
