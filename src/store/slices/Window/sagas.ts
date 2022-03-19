import { fork, put } from 'redux-saga/effects';

import { actions } from '.';
import subscribeToWindowEvent from '../../utils/sagas/subscribe-to-window-event';

function* updateWindowSize() {
  yield put(
    actions.windowSizeUpdated({
      width: window.innerWidth,
      height: window.innerHeight,
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
