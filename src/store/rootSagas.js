import { all } from 'redux-saga/effects'
import productSagas from '../features/seed/seedSagas'
import authSagas from '../features/auth/authSagas'

export default function* rootSaga() {
  yield all([authSagas(), productSagas()])
}
