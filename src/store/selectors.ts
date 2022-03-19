import type { SliceState as ThemeReducerState } from './slices/Theme';
import type { SliceState as ScrollReducerState } from './slices/Scroll';

import { RootState } from '.';

import { name as themeReducerName } from './slices/Theme';
import { name as scrollReducerName } from './slices/Scroll';

export type StateSelector<Result> = (state: RootState) => Result;

export const getTheme: StateSelector<ThemeReducerState> = (state) =>
  state[themeReducerName];

export const getScroll: StateSelector<ScrollReducerState> = (state) =>
  state[scrollReducerName];
