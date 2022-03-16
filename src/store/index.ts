import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import themeReducer, { name as themeReducerName } from './slices/Theme/index';

import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    [themeReducerName]: themeReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware().prepend(sagaMiddleware);

    if (process.env.NODE_ENV === 'development') {
      const loggerMiddleware = createLogger({
        diff: true,
      });

      return defaultMiddleware.concat(loggerMiddleware);
    } else {
      return defaultMiddleware;
    }
  },
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
