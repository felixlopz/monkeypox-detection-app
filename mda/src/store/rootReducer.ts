import {combineReducers} from '@reduxjs/toolkit'
import {
  diagnoseReducer,
  DiagnoseState
} from '../screens/Diagnose/store/DiagnoseSlice'
import {appReducer, AppState} from './appSlice'

export interface RootState {
  diagnoseScreen: DiagnoseState
  app: AppState
}

export const rootReducer = combineReducers<RootState>({
  diagnoseScreen: diagnoseReducer,
  app: appReducer
})
