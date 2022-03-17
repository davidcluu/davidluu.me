import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const scrollKey = 'scroll';

export const positionKey = 'position';

export type Coordinate = {
  x: number;
  y: number;
};

export type ScrollState = { [positionKey]: Coordinate };

const initialState: ScrollState = { [positionKey]: {} as Coordinate };

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
