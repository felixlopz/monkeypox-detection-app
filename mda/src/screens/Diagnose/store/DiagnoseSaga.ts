import {delay, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import {RootActionTypes} from '../../../store/rootActions'
import {
  DiagnoseActionTypes,
  DiagnoseProcessStatus,
  selectDiagnoseProcessStatus
} from './DiagnoseSlice'

function* checkInitialState() {}

export function* diagnoseProcessStatusChanged() {
  const processStatus: DiagnoseProcessStatus = yield select(
    selectDiagnoseProcessStatus
  )
}

export function* diagnoseSagaWatcher() {
  yield takeLatest([RootActionTypes.InitApplication], checkInitialState)

  yield takeEvery(
    [DiagnoseActionTypes.DiagnoseSetprocessStatus],
    diagnoseProcessStatusChanged
  )
}
