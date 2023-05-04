import {delay, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import {RootActionTypes} from '../../../store/rootActions'
import {
  DiagnoseActionTypes,
  DiagnoseProcessStatus,
  selectDiagnoseProcessStatus
} from './DiagnoseSlice'

function* checkInitialState() {}

function* diagnoseProcessStatusChanged() {
  const processStatus: DiagnoseProcessStatus = yield select(
    selectDiagnoseProcessStatus
  )

  // if processStatus == Processing
  // Call the function that process the image and sets the data to store
  // else if processStatus == Reporting
  // Call a function that use and predict the model
  //
}

export function* diagnoseSagaWatcher() {
  yield takeLatest([RootActionTypes.InitApplication], checkInitialState)

  yield takeEvery(
    [DiagnoseActionTypes.DiagnoseSetprocessStatus],
    diagnoseProcessStatusChanged
  )
}
