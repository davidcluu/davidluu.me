import type { Theme } from '@emotion/react';

import type {
  ThemeConfig,
  ThemeInvariantConfigPath,
  ThemeVariantConfigPath,
} from './config';

import type { ReactNode } from 'react';
import type { StateSelector } from '../store/selectors';

import { ThemeProvider } from '@emotion/react';
import { createSelector } from '@reduxjs/toolkit';

import { camelCase, identity } from 'lodash/fp';

import themeConfig from './config';
import { mapPathToCssVariable } from './mappers';
import { resolvePathToCSSValue } from './utils';
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

type CSSValueTransformer<R> = (cssValue: string) => R;

interface EmotionThemeUtils {
  getThemeInvariantCSSVariable: (
    path: ThemeInvariantConfigPath,
    fallback?: string
  ) => string;
  getThemeInvariantCSSValue: <R>(
    path: ThemeInvariantConfigPath,
    cssValueTransformer?: CSSValueTransformer<R>
  ) => R;
  getThemeInvariantCSSWithFallback: (
    property: string,
    path: ThemeInvariantConfigPath,
    prefix?: string,
    suffix?: string
  ) => { [property: string]: string[] };
  getThemeVariantCSSVariable: (
    path: ThemeVariantConfigPath,
    fallback?: string
  ) => string;
  getThemeVariantCSSValue: <R>(
    path: ThemeVariantConfigPath,
    cssValueTransformer?: CSSValueTransformer<R>
  ) => R;
  getThemeVariantCSSWithFallback: (
    property: string,
    path: ThemeVariantConfigPath,
    prefix?: string,
    suffix?: string
  ) => { [property: string]: string[] };
  cssValueTransformers: {
    pixelToNumber: (cssValue: string) => number;
  };
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

const getThemeInvariantCSSVariable = (
  path: ThemeInvariantConfigPath,
  fallback?: string
) => mapPathToCssVariable(path, fallback);

const getThemeVariantCSSVariable = (
  path: ThemeVariantConfigPath,
  fallback?: string
) => mapPathToCssVariable(path, fallback);

function getThemeInvariantCSSValue<R>(
  path: ThemeInvariantConfigPath,
  cssValueTransformer: CSSValueTransformer<R> = identity
): R {
  return cssValueTransformer(
    // @ts-ignore
    resolvePathToCSSValue(
      themeConfig.themeInvariant,
      themeConfig.themeInvariant,
      path
    )
  );
}

function getThemeCSSWithFallbackValueFactory<P>(
  valueGetter: (path: P) => string,
  variableGetter: (path: P, fallback?: string) => string
): (
  property: string,
  path: P,
  prefix?: string,
  suffix?: string
) => { [property: string]: string[] } {
  return (
    property: string,
    path: P,
    prefix: string = '',
    suffix: string = ''
  ) => ({
    [camelCase(property)]: [
      `${prefix} ${valueGetter(path)} ${suffix}`,
      `${prefix} ${variableGetter(path, valueGetter(path))} ${suffix}`,
    ],
  });
}

const getThemeInvariantCSSWithFallback = getThemeCSSWithFallbackValueFactory(
  getThemeInvariantCSSValue,
  getThemeInvariantCSSVariable
);

export default ({ children }: EmotionThemeProviderProps) => {
  const darkMode = useAppSelector(getEmotionDarkModeTheme);

  function getThemeVariantCSSValue<R>(
    path: ThemeVariantConfigPath,
    cssValueTransformer: CSSValueTransformer<R> = identity
  ): R {
    return cssValueTransformer(
      resolvePathToCSSValue(
        darkMode.theme === DarkModeTheme.Light
          ? themeConfig.lightMode
          : themeConfig.darkMode,
        themeConfig.themeInvariant,
        path
      )
    );
  }

  const theme: Theme = {
    darkMode,
    css: {
      themeConfig,
    },
    utils: {
      getThemeInvariantCSSVariable,
      getThemeInvariantCSSValue,
      getThemeInvariantCSSWithFallback,
      getThemeVariantCSSVariable,
      getThemeVariantCSSValue,
      getThemeVariantCSSWithFallback: getThemeCSSWithFallbackValueFactory(
        getThemeVariantCSSValue,
        getThemeVariantCSSVariable
      ),
      cssValueTransformers: {
        pixelToNumber: parseInt,
      },
    },
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
