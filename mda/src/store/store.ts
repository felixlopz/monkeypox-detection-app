import {configureStore, EnhancedStore} from '@reduxjs/toolkit'
import {Dispatch} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from './rootReducer'
import {rootSaga} from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

export const store: EnhancedStore = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
})
sagaMiddleware.run(rootSaga)

export const dispatch: Dispatch = store.dispatch
