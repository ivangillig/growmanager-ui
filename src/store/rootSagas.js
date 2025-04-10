import { all } from 'redux-saga/effects'
import productSagas from '../features/seed/seedSagas'
import authSagas from '../features/auth/authSagas'
import batchSagas from '../features/batch/batchSagas'
import seedBankSagas from '../features/seedBank/seedBankSagas'

export default function* rootSaga() {
  yield all([authSagas(), productSagas(), batchSagas(), seedBankSagas()])
}
