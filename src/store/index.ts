import { configureStore } from '@reduxjs/toolkit';

import themeReducer, {
  name as themeReducerName,
  setupDependencies as setupThemeReducerDependencies,
} from './slices/Theme/index';

export const store = configureStore({
  reducer: {
    [themeReducerName]: themeReducer,
  },
});

setupThemeReducerDependencies(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
