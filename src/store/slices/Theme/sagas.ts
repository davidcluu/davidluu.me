import { PayloadAction } from '@reduxjs/toolkit';
import { eventChannel } from 'redux-saga';
import { fork, put, select, take, takeEvery } from 'redux-saga/effects';

import { Theme, actions } from '.';
import { getTheme } from './selectors';

import {
  getTheme as getGlobalTheme,
  setTheme as setGlobalTheme,
  setThemeChangeCallback as setGlobalThemeChangeCallback,
} from '../../../theme/api';

function* updateStore() {
  yield put(actions.themeUpdated(getGlobalTheme()));
}

function* onSetTheme(action: PayloadAction<Theme>) {
  setGlobalTheme(action.payload);
  yield fork(updateStore);
}

function* subscribeToThemeChanges() {
  const themeChangeChannel = eventChannel<Theme>((emit) => {
    setGlobalThemeChangeCallback(emit);

    return () => {
      setGlobalThemeChangeCallback(() => {});
    };
  });

  while (true) {
    const newTheme = yield take(themeChangeChannel);
    const currentTheme = yield select(getTheme);

    if (currentTheme != newTheme) {
      yield put(actions.themeUpdated(newTheme));
    }
  }
}

function* themeSaga() {
  // Update the store once initially to populate the state
  yield fork(updateStore);
  // Everytime setTheme is sent, set the theme globally then update the store
  yield takeEvery(actions.setTheme.toString(), onSetTheme);
  // Update the Redux state if external theme changes happen
  yield fork(subscribeToThemeChanges);
}

export default themeSaga;
