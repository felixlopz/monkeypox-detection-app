import {all, fork} from 'redux-saga/effects'
import {diagnoseSagaWatcher} from '../screens/Diagnose/store/DiagnoseSaga'
import {appSagaWatcher} from './appSaga'

export function* rootSaga() {
  yield all([fork(diagnoseSagaWatcher), fork(appSagaWatcher)])
}
