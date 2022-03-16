import type { StateSelector } from '../../selectors';
import type { SliceState, Theme } from '.';

import { createSelector } from '@reduxjs/toolkit';

import { getTheme as getThemeState } from '../../selectors';
import { themeKey, darkModeKey, lightModeKey } from '.';

const createStateSelector = <Result>(key: string): StateSelector<Result> =>
  createSelector(getThemeState, (state: SliceState) => state[key]);

export const getTheme: StateSelector<Theme> = createStateSelector(themeKey);

export const getDarkMode: StateSelector<boolean> =
  createStateSelector(darkModeKey);

export const getLightMode: StateSelector<boolean> =
  createStateSelector(lightModeKey);
