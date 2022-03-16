import type { Store } from 'redux';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  Theme,
  getTheme,
  setTheme,
  setThemeChangeCallback,
} from '../../../theme/theme-api';

export { Theme } from '../../../theme/theme-api';

export const themeKey = 'theme';
export const darkModeKey = 'darkMode';
export const lightModeKey = 'lightMode';

function getUpdatedState(): SliceState {
  const theme = getTheme();

  return {
    [themeKey]: theme,
    [darkModeKey]: theme === Theme.Dark,
    [lightModeKey]: theme === Theme.Light,
  };
}

export type SliceState = {
  [themeKey]: Theme;
  [darkModeKey]: boolean;
  [lightModeKey]: boolean;
};

const initialState: SliceState = getUpdatedState();

export const name = 'theme';

const setThemeThunk = (theme: Theme, actionName: string) =>
  createAsyncThunk(`${name}/${actionName}`, async () => {
    setTheme(theme);
  });

const setDarkMode = setThemeThunk(Theme.Dark, 'setDarkMode');
const setLightMode = setThemeThunk(Theme.Light, 'setLightMode');

const updateState = (state: SliceState) =>
  Object.assign(state, getUpdatedState());

const slice = createSlice({
  name,
  initialState,
  reducers: {
    refresh: updateState,
  },
  extraReducers: (builder) => {
    [setDarkMode, setLightMode].forEach((themeSetter) =>
      builder.addCase(themeSetter.fulfilled, updateState)
    );
  },
});

export const actions = {
  ...slice.actions,
  setDarkMode,
  setLightMode,
};

export const setupDependencies = (store: Store) =>
  setThemeChangeCallback(() => store.dispatch(actions.refresh()));

export default slice.reducer;
