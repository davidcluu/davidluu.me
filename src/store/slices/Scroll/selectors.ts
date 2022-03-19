import type { StateSelector } from '../../selectors';
import type { SliceState, Coordinate } from '.';

import { createSelector } from '@reduxjs/toolkit';

import { getScroll as getRootState } from '../../selectors';
import { positionKey } from '.';

const createStateSelector = <Result>(key: string): StateSelector<Result> =>
  createSelector(getRootState, (state: SliceState) => state[key]);

const getScroll: StateSelector<Coordinate> = createStateSelector(positionKey);

export const getScrollX: StateSelector<number> = createSelector(
  getScroll,
  (scroll) => scroll.x
);

export const getScrollY: StateSelector<number> = createSelector(
  getScroll,
  (scroll) => scroll.y
);
