import type { ReactNode } from 'react';
import type { StateSelector } from '../store/selectors';

import { ThemeProvider } from '@emotion/react';
import { createSelector } from '@reduxjs/toolkit';

import { Theme } from './theme-api';

import { useAppSelector } from '../store/hooks';
import {
  getTheme,
  getDarkMode,
  getLightMode,
} from '../store/slices/Theme/selectors';

interface EmotionDarkModeTheme {
  theme: Theme;
  darkMode: boolean;
  lightMode: boolean;
}

declare module '@emotion/react' {
  export interface Theme extends EmotionDarkModeTheme {}
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

export default ({ children }: EmotionThemeProviderProps) => (
  <ThemeProvider theme={useAppSelector(getEmotionDarkModeTheme)}>
    {children}
  </ThemeProvider>
);
