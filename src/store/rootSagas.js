import { all } from 'redux-saga/effects'
import productSagas from '../features/seed/seedSagas'
import authSagas from '../features/auth/authSagas'
import batchSagas from '../features/batch/batchSagas'

export default function* rootSaga() {
  yield all([authSagas(), productSagas(), batchSagas()])
}
