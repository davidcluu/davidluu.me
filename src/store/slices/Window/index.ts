import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const sizeKey = 'size';

export type Dimension = {
  width: number;
  height: number;
};

export type SliceState = { [sizeKey]: Dimension };

const initialState: SliceState = { [sizeKey]: {} as Dimension };

export const name = 'window';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    windowSizeUpdated(state, action: PayloadAction<Dimension>) {
      state[sizeKey] = action.payload;
    },
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
