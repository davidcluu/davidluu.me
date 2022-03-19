import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import themeReducer, { name as themeReducerName } from './slices/Theme';
import scrollReducer, { name as scrollReducerName } from './slices/Scroll';
import windowReducer, { name as windowReducerName } from './slices/Window';

import rootSaga from './root-saga';
import { some, startsWith } from 'lodash/fp';

const LOGGER_REDUCER_PREFIX_DISALLOW_LIST = [
  scrollReducerName,
  windowReducerName,
];

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    [themeReducerName]: themeReducer,
    [scrollReducerName]: scrollReducer,
    [windowReducerName]: windowReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware().prepend(sagaMiddleware);

    if (process.env.NODE_ENV === 'development') {
      const actionTypeInPrefixDisallowList = (action: any) =>
        some(
          (prefix) => startsWith(prefix, action.type),
          LOGGER_REDUCER_PREFIX_DISALLOW_LIST
        );

      const loggerMiddleware = createLogger({
        predicate: (_getState, action) =>
          !actionTypeInPrefixDisallowList(action),
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
