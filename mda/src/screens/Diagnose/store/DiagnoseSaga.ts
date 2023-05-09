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
import {resizeImageForModelPrediction} from 'src/utils/imageUtils'
import {ImageResult} from 'expo-image-manipulator'
import {makePrediction} from 'src/services'
import {selectModel} from 'src/store/appSlice'
import {LayersModel} from '@tensorflow/tfjs'

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

  const resizedImage: ImageResult = yield call(
    resizeImageForModelPrediction,
    capturedImage
  )

  if (resizedImage == null) {
    return // Handle Error
  }

  const model: LayersModel = yield select(selectModel)

  const prediction: DiagnoseLabels = yield call(
    makePrediction,
    resizedImage,
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
