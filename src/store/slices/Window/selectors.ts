import type { StateSelector } from '../../selectors';
import type { SliceState, Dimension } from '.';

import { createSelector } from '@reduxjs/toolkit';

import { getWindow as getRootState } from '../../selectors';
import { sizeKey } from '.';

const createStateSelector = <Result>(key: string): StateSelector<Result> =>
  createSelector(getRootState, (state: SliceState) => state[key]);

export const getSize: StateSelector<Dimension> = createStateSelector(sizeKey);

export const getWindowWidth: StateSelector<number> = createSelector(
  getSize,
  (size) => size.width
);

export const getWindowHeight: StateSelector<number> = createSelector(
  getSize,
  (size) => size.height
);
