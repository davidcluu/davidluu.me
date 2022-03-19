import type { SliceState as ThemeReducerState } from './slices/Theme';
import type { SliceState as ScrollReducerState } from './slices/Scroll';
import type { SliceState as WindowReducerState } from './slices/Window';

import { RootState } from '.';

import { name as themeReducerName } from './slices/Theme';
import { name as scrollReducerName } from './slices/Scroll';
import { name as windowReducerName } from './slices/Window';

export type StateSelector<Result> = (state: RootState) => Result;

export const getTheme: StateSelector<ThemeReducerState> = (state) =>
  state[themeReducerName];

export const getScroll: StateSelector<ScrollReducerState> = (state) =>
  state[scrollReducerName];

export const getWindow: StateSelector<WindowReducerState> = (state) =>
  state[windowReducerName];
