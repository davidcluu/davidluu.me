import { fork, put } from 'redux-saga/effects';

import { actions } from '.';
import subscribeToWindowEvent from '../../utils/sagas/subscribe-to-window-event';

function* updateScrollPosition() {
  yield put(
    actions.scrollPositionUpdated({
      x: window.pageXOffset || window.scrollX,
      y: window.pageYOffset || window.scrollY,
    })
  );
}

function* scrollSaga() {
  // Update the store once initially to populate the state
  yield fork(updateScrollPosition);
  // Everytime a scroll event happens, update the scroll position
  yield fork(subscribeToWindowEvent('scroll', updateScrollPosition));
}

export default scrollSaga;
