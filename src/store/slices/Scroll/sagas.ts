import { eventChannel } from 'redux-saga';
import { fork, put, take } from 'redux-saga/effects';
import { actions } from '.';

function* updateScrollPosition() {
  yield put(
    actions.scrollPositionUpdated({ x: window.scrollX, y: window.scrollY })
  );
}

function* subscribeToScrollPositionChanges() {
  const scrollPositionChangeChannel = eventChannel<void>((emit) => {
    const eventListener = emit as () => void;

    window.addEventListener('scroll', eventListener);

    return () => window.removeEventListener('scroll', eventListener);
  });

  while (true) {
    yield take(scrollPositionChangeChannel);
    yield fork(updateScrollPosition);
  }
}

function* scrollSaga() {
  // Update the store once initially to populate the state
  yield fork(updateScrollPosition);
  // Everytime a scroll event happens, update the scroll position
  yield fork(subscribeToScrollPositionChanges);
}

export default scrollSaga;
