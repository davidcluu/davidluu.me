import { all } from 'redux-saga/effects';

import themeSaga from './slices/Theme/sagas';
import scrollSaga from './slices/Scroll/sagas';

export default function* () {
  yield all([themeSaga(), scrollSaga()]);
}
