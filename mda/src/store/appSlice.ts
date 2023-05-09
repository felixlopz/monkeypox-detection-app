import {
  createAction,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import {RootState} from './rootReducer'
import {LayersModel} from '@tensorflow/tfjs'

export interface AppState {
  appLoaded: boolean
  modelLoadingError: boolean
  modelLoaded: boolean
  model: any | null
}

export enum AppActionTypes {
  AppSetIsTensorflowReady = 'appSlice/setIsTensorflowReady'
}

const initialState: AppState = {
  appLoaded: false,
  modelLoadingError: false,
  modelLoaded: false,
  model: null
}

const appSlice = createSlice({
  initialState: initialState,
  name: 'appSlice',
  reducers: {
    setAppLoaded: (state: AppState, action: PayloadAction<boolean>) => ({
      ...state,
      appLoaded: action.payload
    }),
    setModelLoaded: (state: AppState, action: PayloadAction<boolean>) => ({
      ...state,
      modelLoaded: action.payload
    }),
    setModel: (state: AppState, action: PayloadAction<LayersModel>) => ({
      ...state,
      model: action.payload
    }),
    setModelLoadingError: (
      state: AppState,
      action: PayloadAction<boolean>
    ) => ({
      ...state,
      modelLoadingError: action.payload
    })
  }
})

export const appReducer = appSlice.reducer

// Actions
export const {setModelLoadingError, setModel, setModelLoaded, setAppLoaded} =
  appSlice.actions

// Selectors
export const selecAppState = (state: RootState) => state.app

export const selectModelLoaded = createSelector(
  selecAppState,
  (state: AppState) => state.modelLoaded
)

export const selectAppLoaded = createSelector(
  selecAppState,
  (state: AppState) => state.appLoaded
)

export const selectModel = createSelector(
  selecAppState,
  (state: AppState) => state.model
)
