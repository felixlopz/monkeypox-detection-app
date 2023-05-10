import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../store'
import {CameraCapturedPicture} from 'expo-camera'
import {ImagePickerAsset} from 'expo-image-picker'

export enum DiagnoseProcessStatus {
  Acquiring = 'Acquiring',
  Processing = 'Processing',
  Reporting = 'Reporting'
}

export enum DiagnoseLabels {
  Chickenpox = 'Chickenpox',
  Measles = 'Measles',
  Monkeypox = 'Monkeypox',
  Normal = 'Normal',
  Undetermined = 'Undetermined'
}

export type CapturedImageType = CameraCapturedPicture | ImagePickerAsset | null

export enum DiagnoseActionTypes {
  DiagnoseSetprocessStatus = 'diagnoseSlice/setProcessStatus',
  DiagnoseSetCapturedImage = 'diagnoseSlice/setCapturedImage'
}

export interface DiagnosisResult {
  id: string
  name: string
  imageUri: string
  prediction: DiagnoseLabels
}

export interface DiagnoseState {
  processStatus: DiagnoseProcessStatus
  capturedImage: CapturedImageType
  prediction: DiagnoseLabels
  dianosisResults: Array<DiagnosisResult>
}

const initialState: DiagnoseState = {
  processStatus: DiagnoseProcessStatus.Acquiring,
  capturedImage: null,
  prediction: DiagnoseLabels.Undetermined,
  dianosisResults: []
}

const diagnoseSlice = createSlice({
  initialState: initialState,
  name: 'diagnoseSlice',
  reducers: {
    setProcessStatus: (
      state: DiagnoseState,
      action: PayloadAction<DiagnoseProcessStatus>
    ) => ({
      ...state,
      processStatus: action.payload
    }),
    setCapturedImage: (
      state: DiagnoseState,
      action: PayloadAction<CapturedImageType>
    ) => ({
      ...state,
      capturedImage: action.payload
    }),
    setPrediction: (
      state: DiagnoseState,
      action: PayloadAction<DiagnoseLabels>
    ) => ({
      ...state,
      prediction: action.payload
    }),
    setDiagnosisResults: (
      state: DiagnoseState,
      action: PayloadAction<Array<DiagnosisResult>>
    ) => ({
      ...state,
      dianosisResults: action.payload
    })
  }
})

export const diagnoseReducer = diagnoseSlice.reducer

// Actions
export const {
  setProcessStatus,
  setCapturedImage,
  setPrediction,
  setDiagnosisResults
} = diagnoseSlice.actions

// Selectors
export const selectDiagnoseState = (state: RootState) => state.diagnoseScreen

export const selectDiagnoseProcessStatus = createSelector(
  selectDiagnoseState,
  (state: DiagnoseState) => state.processStatus
)

export const selectCapturedImage = createSelector(
  selectDiagnoseState,
  (state: DiagnoseState) => state.capturedImage
)

export const selectPrediction = createSelector(
  selectDiagnoseState,
  (state: DiagnoseState) => state.prediction
)

export const selectDiagnosisResults = createSelector(
  selectDiagnoseState,
  (state: DiagnoseState) => state.dianosisResults
)
