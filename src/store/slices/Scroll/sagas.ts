import { fork, put } from 'redux-saga/effects';

import { actions } from '.';
import { isBrowser } from '../../../constants';
import subscribeToWindowEvent from '../../utils/sagas/subscribe-to-window-event';

function* updateScrollPosition() {
  yield put(
    actions.scrollPositionUpdated({
      x: isBrowser ? window.pageXOffset || window.scrollX : 0,
      y: isBrowser ? window.pageYOffset || window.scrollY : 0,
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
