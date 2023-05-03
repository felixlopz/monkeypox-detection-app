import {combineReducers} from '@reduxjs/toolkit'
import {diagnoseReducer, DiagnoseState} from '../screens'

export interface RootState {
  diagnoseScreen: DiagnoseState
}

export const rootReducer = combineReducers<RootState>({
  diagnoseScreen: diagnoseReducer
})
