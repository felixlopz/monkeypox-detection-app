import {all, fork} from 'redux-saga/effects'
import {diagnoseSagaWatcher} from '../screens'

export function* rootSaga() {
  yield all([fork(diagnoseSagaWatcher)])
}
