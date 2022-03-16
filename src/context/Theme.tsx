import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  setTheme,
  setThemeChangeCallback,
  getTheme,
  Theme,
} from '../theme/theme-api';

export { Theme } from '../theme/theme-api';

export interface ThemeContextReadOnlyInterface {
  theme: Theme;
  darkMode: boolean;
  lightMode: boolean;
}

export interface ThemeContextInterface extends ThemeContextReadOnlyInterface {
  setDarkMode: () => void;
  setLightMode: () => void;
}

const ThemeContext = createContext<ThemeContextInterface | null>(null);

export interface ThemeContextProviderProps {
  children: JSX.Element;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps): JSX.Element => {
  const [theme, setThemeState] = useState(getTheme);

  useEffect(() => {
    setThemeChangeCallback(setThemeState);
  }, []);

  const value = {
    theme,
    darkMode: theme === Theme.Dark,
    lightMode: theme === Theme.Light,
    setDarkMode: () => setTheme(Theme.Dark),
    setLightMode: () => setTheme(Theme.Light),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () =>
  useContext(ThemeContext as React.Context<ThemeContextInterface>);
