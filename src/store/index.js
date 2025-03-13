import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSagas'
import configureAxios from '../../utils/axiosConfig'

const sagaMiddleware = createSagaMiddleware()

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  })

  if (!store.__SAGA_RUN__) {
    store.__SAGA_RUN__ = true
    sagaMiddleware.run(rootSaga)
  }

  configureAxios(store)

  return store
}

export const wrapper = createWrapper(makeStore, {
  // debug: process.env.NODE_ENV !== 'production',
})
