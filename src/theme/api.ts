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
  return window.__theme;
}

export function setTheme(theme: Theme): void {
  window.__setPreferredTheme(theme);
}

export function setThemeChangeCallback(callback: (theme: Theme) => void): void {
  window.__onThemeChange = callback;
}
