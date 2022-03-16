import type { StateSelector } from '../../selectors';
import { SliceState, Theme } from '.';

import { createSelector } from '@reduxjs/toolkit';

import { getTheme as getThemeState } from '../../selectors';
import { themeKey } from '.';

const createStateSelector = <Result>(key: string): StateSelector<Result> =>
  createSelector(getThemeState, (state: SliceState) => state[key]);

export const getTheme: StateSelector<Theme> = createStateSelector(themeKey);

export const getDarkMode: StateSelector<boolean> = createSelector(
  getTheme,
  (theme) => theme == Theme.Dark
);

export const getLightMode: StateSelector<boolean> = createSelector(
  getTheme,
  (theme) => theme == Theme.Light
);
