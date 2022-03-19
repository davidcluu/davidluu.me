import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const positionKey = 'position';

export type Coordinate = {
  x: number;
  y: number;
};

export type SliceState = { [positionKey]: Coordinate };

const initialState: SliceState = { [positionKey]: {} as Coordinate };

export const name = 'scroll';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    scrollPositionUpdated(state, action: PayloadAction<Coordinate>) {
      state[positionKey] = action.payload;
    },
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
