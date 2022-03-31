import type { GatsbyBrowser, GatsbySSR } from 'gatsby';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store';

import EmotionThemeProvider from './src/theme/EmotionThemeProvider';
import EmotionThemeGlobalCSSProperties from './src/theme/EmotionThemeGlobalCSSProperties';

import { LazyMotion, domAnimation } from 'framer-motion';

import FormContextProvider from './src/context/FormContext';

import './src/styles/main.scss';

type WrapRootElementType = GatsbyBrowser['wrapRootElement'] &
  GatsbySSR['wrapRootElement'];

export const wrapRootElement: WrapRootElementType = ({ element }) => (
  <ReduxProvider store={store}>
    <EmotionThemeProvider>
      <EmotionThemeGlobalCSSProperties />
      <LazyMotion features={domAnimation} strict>
        <FormContextProvider>{element}</FormContextProvider>
      </LazyMotion>
    </EmotionThemeProvider>
  </ReduxProvider>
);
