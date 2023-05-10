import {
  delay,
  put,
  takeEvery,
  takeLatest,
  select,
  call
} from 'redux-saga/effects'
import {RootActionTypes} from './rootActions'
import {getAllDiagnosisResult, loadModel} from 'src/services'
import {LayersModel} from '@tensorflow/tfjs'
import {useFonts, loadAsync} from 'expo-font'
import {Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import {Pacifico_400Regular} from '@expo-google-fonts/pacifico'
import {
  setAppLoaded,
  setModel,
  setModelLoaded,
  setModelLoadingError
} from './appSlice'
import {Platform} from 'react-native'
import {
  DiagnosisResult,
  setDiagnosisResults
} from 'src/screens/Diagnose/store/DiagnoseSlice'

function* initApplication() {
  console.log('initApplication')
  console.log('Before using appLoading')

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

  console.log('AfterLoadingApp')
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
