import { all, fork } from 'redux-saga/effects';
import { map } from 'lodash/fp';

import themeSaga from './slices/Theme/sagas';
import scrollSaga from './slices/Scroll/sagas';
import windowSaga from './slices/Window/sagas';

export default function* () {
  yield all(map(fork, [themeSaga, scrollSaga, windowSaga]));
}
