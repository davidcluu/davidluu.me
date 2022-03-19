import type { Saga } from 'redux-saga';

import { eventChannel } from 'redux-saga';
import { fork, take } from 'redux-saga/effects';

export default <K extends keyof WindowEventMap>(
  eventType: K,
  eventListenerSaga: Saga
) =>
  function* subscribeToWindowEvent() {
    const scrollPositionChangeChannel = eventChannel<void>((emit) => {
      const eventListener = emit as () => void;

      window.addEventListener(eventType, eventListener);

      return () => window.removeEventListener(eventType, eventListener);
    });

    while (true) {
      yield take(scrollPositionChangeChannel);
      yield fork(eventListenerSaga);
    }
  };
