import type { SerializedStyles, Theme } from '@emotion/react';

import {
  ThemeConfig,
  ThemeInvariantConfigPath,
  ThemeVariantConfigPath,
} from './config';

import type { ReactNode } from 'react';
import type { StateSelector } from '../store/selectors';

import { ThemeProvider } from '@emotion/react';
import { createSelector } from '@reduxjs/toolkit';

import themeConfig from './config';
import { mapPathToCSSValue, pathToCssVariable } from './mappers';
import { Theme as DarkModeTheme } from './api';

import { useAppSelector } from '../store/hooks';
import {
  getTheme,
  getDarkMode,
  getLightMode,
} from '../store/slices/Theme/selectors';

interface EmotionDarkModeTheme {
  theme: DarkModeTheme;
  darkMode: boolean;
  lightMode: boolean;
}

interface EmotionCSSTheme {
  themeConfig: ThemeConfig;
}

interface EmotionThemeUtils {
  getThemeInvariantCSSVariable: (path: ThemeInvariantConfigPath) => string;
  getThemeVariantCSSVariable: (path: ThemeVariantConfigPath) => string;
}

declare module '@emotion/react' {
  export interface Theme {
    darkMode: EmotionDarkModeTheme;
    css: EmotionCSSTheme;
    utils: EmotionThemeUtils;
  }
}

interface EmotionThemeProviderProps {
  children: ReactNode;
}

const getEmotionDarkModeTheme: StateSelector<EmotionDarkModeTheme> =
  createSelector(
    getTheme,
    getDarkMode,
    getLightMode,
    (theme, darkMode, lightMode) => ({ theme, darkMode, lightMode })
  );

const getThemeInvariantCSSVariable = (path: ThemeInvariantConfigPath) =>
  pathToCssVariable(path);

const getThemeVariantCSSVariable = (path: ThemeVariantConfigPath) =>
  pathToCssVariable(path);

export default ({ children }: EmotionThemeProviderProps) => {
  const darkMode = useAppSelector(getEmotionDarkModeTheme);

  const theme: Theme = {
    darkMode,
    css: {
      themeConfig,
    },
    utils: {
      getThemeInvariantCSSVariable,
      getThemeVariantCSSVariable,
    },
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
