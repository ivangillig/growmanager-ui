import { call, put, takeLatest, all, fork } from 'redux-saga/effects'
import { getSeedBanksSuccess, getSeedBanksError } from './seedBankActions'
import { GET_SEED_BANKS_REQUEST } from '@/src/constants/ActionsTypes'
import { fetchSeedBanksApi } from './seedBankApi'

function* getSeedBanksSaga() {
  try {
    const seedBanks = yield call(fetchSeedBanksApi)
    yield put(getSeedBanksSuccess(seedBanks))
  } catch (error) {
    yield put(getSeedBanksError(error.message))
  }
}

export function* watchGetSeedBanksSaga() {
  yield takeLatest(GET_SEED_BANKS_REQUEST, getSeedBanksSaga)
}

export default function* seedBankSagas() {
  yield all([fork(watchGetSeedBanksSaga)])
}