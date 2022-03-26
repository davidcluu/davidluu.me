import type { GatsbyBrowser, GatsbySSR } from 'gatsby';

import { Provider as ReduxProvider } from 'react-redux';
import { LazyMotion, domAnimation } from 'framer-motion';

import 'normalize.css';

import EmotionThemeProvider from './src/theme/EmotionThemeProvider';

import EmotionThemeGlobalCSSProperties from './src/theme/EmotionThemeGlobalCSSProperties';
import { store } from './src/store';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] &
  GatsbySSR['wrapRootElement'] = ({ element }) => (
  <ReduxProvider store={store}>
    <EmotionThemeProvider>
      <EmotionThemeGlobalCSSProperties />
      <LazyMotion features={domAnimation} strict>
        {element}
      </LazyMotion>
    </EmotionThemeProvider>
  </ReduxProvider>
);
