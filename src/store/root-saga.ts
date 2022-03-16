import { all } from 'redux-saga/effects';

import themeSaga from './slices/Theme/sagas';

export default function* () {
  yield all([themeSaga()]);
}
