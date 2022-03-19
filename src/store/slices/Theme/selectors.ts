import type { StateSelector } from '../../selectors';
import type { SliceState } from '.';

import { createSelector } from '@reduxjs/toolkit';

import { getTheme as getRootState } from '../../selectors';
import { Theme, themeKey } from '.';

const createStateSelector = <Result>(key: string): StateSelector<Result> =>
  createSelector(getRootState, (state: SliceState) => state[key]);

export const getTheme: StateSelector<Theme> = createStateSelector(themeKey);

export const getDarkMode: StateSelector<boolean> = createSelector(
  getTheme,
  (theme) => theme == Theme.Dark
);

export const getLightMode: StateSelector<boolean> = createSelector(
  getTheme,
  (theme) => theme == Theme.Light
);
