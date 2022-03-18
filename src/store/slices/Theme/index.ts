import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Theme } from '../../../theme/api';

export { Theme } from '../../../theme/api';

export const themeKey = 'theme';

export type SliceState = {
  [themeKey]: Theme;
};

const initialState: SliceState = {} as SliceState;

export const name = 'theme';

const setTheme = createAction<Theme>(`${name}/setTheme`);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    themeUpdated(state, action: PayloadAction<Theme>) {
      state[themeKey] = action.payload;
    },
  },
});

export const actions = {
  ...slice.actions,
  setTheme,
};

export default slice.reducer;
