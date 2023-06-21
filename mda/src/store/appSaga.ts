import {put, takeLatest, call, fork} from 'redux-saga/effects'
import {RootActionTypes} from './rootActions'
import {getAllDiagnosisResult} from 'src/services/asyncStorage'
import {loadModel} from 'src/services/tensorflow'
import {LayersModel} from '@tensorflow/tfjs'
import {loadAsync} from 'expo-font'
import {Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import {Pacifico_400Regular} from '@expo-google-fonts/pacifico'
import {
  setAppLoaded,
  setModel,
  setModelLoaded,
  setModelLoadingError
} from './appSlice'
import {
  DiagnosisResult,
  setDiagnosisResults
} from 'src/screens/Diagnose/store/DiagnoseSlice'

function* initApplication() {
  try {
    yield call(loadAsync, {
      Roboto_400Regular,
      Roboto_700Bold,
      Pacifico_400Regular
    })
    const model: LayersModel = yield call(loadTensorflowModel)

    const diagnosisResults: Array<DiagnosisResult> = yield call(
      getAllDiagnosisResult
    )
    yield put(setDiagnosisResults(diagnosisResults))
    yield put(setModel(model))
    yield put(setModelLoaded(true))
    yield put(setAppLoaded(true))
  } catch (error) {
    console.log(error)
    yield put(setAppLoaded(false))
    yield put(setModelLoaded(false))
  }
}

function* loadTensorflowModel() {
  const model: LayersModel | null = yield call(loadModel)
  if (model == null) {
    yield put(setModelLoadingError(true))
    throw new Error('Model Loading Failed')
  }
  return model
}

export function* appSagaWatcher() {
  yield takeLatest([RootActionTypes.InitApplication], initApplication)
}
