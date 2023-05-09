import {
  delay,
  put,
  takeEvery,
  takeLatest,
  select,
  call
} from 'redux-saga/effects'
import {
  CapturedImageType,
  DiagnoseActionTypes,
  DiagnoseLabels,
  DiagnoseProcessStatus,
  selectCapturedImage,
  selectDiagnoseProcessStatus,
  setPrediction,
  setProcessStatus
} from './DiagnoseSlice'
import {makePrediction, processImage} from 'src/services'
import {selectModel} from 'src/store/appSlice'
import {LayersModel, Rank, Tensor} from '@tensorflow/tfjs'

function* diagnoseProcessStatusChanged() {
  const processStatus: DiagnoseProcessStatus = yield select(
    selectDiagnoseProcessStatus
  )

  if (processStatus === DiagnoseProcessStatus.Processing) {
    yield call(processImageAndMakePrediction)
    yield put(setProcessStatus(DiagnoseProcessStatus.Reporting))
  }
}

function* processImageAndMakePrediction() {
  const capturedImage: CapturedImageType = yield select(selectCapturedImage)
  const model: LayersModel = yield select(selectModel)

  const processedImage: Tensor<Rank> = yield call(processImage, capturedImage)

  const prediction: DiagnoseLabels = yield call(
    makePrediction,
    processedImage,
    model
  )

  yield put(setPrediction(prediction))
}

export function* diagnoseSagaWatcher() {
  yield takeEvery(
    [DiagnoseActionTypes.DiagnoseSetprocessStatus],
    diagnoseProcessStatusChanged
  )
}
