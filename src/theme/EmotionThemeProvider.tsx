import type { Theme } from '@emotion/react';
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
import { mapPathToCSSValue } from './mappers';
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
  getThemeInvariantCSSValue: (path: ThemeInvariantConfigPath) => string;
  getThemeVariantCSSValue: (
    path: ThemeVariantConfigPath,
    theme?: DarkModeTheme
  ) => string;
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

const getThemeInvariantCSSValue = (path: ThemeInvariantConfigPath) =>
  mapPathToCSSValue(themeConfig.themeInvariant)(path);

export default ({ children }: EmotionThemeProviderProps) => {
  const darkMode = useAppSelector(getEmotionDarkModeTheme);

  const getThemeVariantCSSValue = (
    path: ThemeVariantConfigPath,
    theme: DarkModeTheme = darkMode.theme
  ): string =>
    mapPathToCSSValue(
      theme === DarkModeTheme.Light
        ? themeConfig.lightMode
        : themeConfig.darkMode
    )(path);

  const theme: Theme = {
    darkMode,
    css: {
      themeConfig,
    },
    utils: {
      getThemeInvariantCSSValue,
      getThemeVariantCSSValue,
    },
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
