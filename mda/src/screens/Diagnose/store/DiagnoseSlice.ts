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
  Monkeypox = 'Monkeypox',
  Chickenpox = 'Chickenpox',
  Measles = 'Measles',
  Normal = 'Normal'
}

export const DiagnoseArrayLabels = [
  DiagnoseLabels.Chickenpox,
  DiagnoseLabels.Measles,
  DiagnoseLabels.Monkeypox,
  DiagnoseLabels.Normal
]

export type CapturedImageType = CameraCapturedPicture | ImagePickerAsset | null

export interface DiagnoseState {
  processStatus: DiagnoseProcessStatus
  capturedImage: CapturedImageType
}

export enum DiagnoseActionTypes {
  DiagnoseSetprocessStatus = 'diagnoseSlice/setProcessStatus',
  DiagnoseSetCapturedImage = 'diagnoseSlice/setCapturedImage'
}

const initialState: DiagnoseState = {
  processStatus: DiagnoseProcessStatus.Acquiring,
  capturedImage: null
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
    })
  }
})

export const diagnoseReducer = diagnoseSlice.reducer

// Actions
export const {setProcessStatus, setCapturedImage} = diagnoseSlice.actions

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
