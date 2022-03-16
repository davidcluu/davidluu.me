import type { SliceState as ThemeReducerState } from './slices/Theme/index';

import { RootState } from '.';

import { name as themeReducerName } from './slices/Theme/index';

export type StateSelector<Result> = (state: RootState) => Result;

export const getTheme: StateSelector<ThemeReducerState> = (state) =>
  state[themeReducerName];
