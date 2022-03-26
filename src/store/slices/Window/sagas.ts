import { fork, put } from 'redux-saga/effects';

import { actions } from '.';
import subscribeToWindowEvent from '../../utils/sagas/subscribe-to-window-event';

import { isBrowser } from '../../../constants';

function* updateWindowSize() {
  yield put(
    actions.windowSizeUpdated({
      width: isBrowser ? window.innerWidth : 0,
      height: isBrowser ? window.innerHeight : 0,
    })
  );
}

function* windowSaga() {
  // Uppdate the store once intiially to populate the state
  yield fork(updateWindowSize);
  // Everytime a window resize happens, update the window size
  yield fork(subscribeToWindowEvent('resize', updateWindowSize));
}

export default windowSaga;
