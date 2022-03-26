import { isBrowser } from '../constants';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

declare global {
  interface Window {
    __theme: Theme;
    __setPreferredTheme: (newTheme: Theme) => void;
    __onThemeChange: (theme: Theme) => void;
  }
}

export function getTheme(): Theme {
  if (isBrowser) {
    return window.__theme;
  }
  return Theme.Light;
}

export function setTheme(theme: Theme): void {
  if (isBrowser) {
    window.__setPreferredTheme(theme);
  }
}

export function setThemeChangeCallback(callback: (theme: Theme) => void): void {
  if (isBrowser) {
    window.__onThemeChange = callback;
  }
}
