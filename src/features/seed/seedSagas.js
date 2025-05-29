import { call, put, takeLatest, all, fork } from 'redux-saga/effects'
import {
  getSeedsSuccess,
  getSeedsError,
  addSeedSuccess,
  addSeedError,
  addSeedBankSuccess,
  addSeedBankError,
} from './seedActions'
import {
  GET_SEEDS_REQUEST,
  ADD_SEED_REQUEST,
  ADD_SEED_BANK_REQUEST,
} from '@/src/constants/ActionsTypes'
import { getSeedsApi, addSeedApi, addSeedBankApi } from './seedApi'
import { showMessage } from '@/src/features/notifications/notificationActions'

function* getSeedsSaga() {
  try {
    const response = yield call(getSeedsApi)

    if (response) {
      yield put(getSeedsSuccess(response.data))
    }
  } catch (error) {
    yield put(getSeedsError(error.message))
  }
}

function* addSeedSaga(action) {
  try {
    const response = yield call(addSeedApi, action.payload)
    yield put(addSeedSuccess(response.seed))
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: 'Seed added successfully',
          type: 'success',
        },
      ])
    )
  } catch (error) {
    yield put(addSeedError(error.message))
  }
}

function* addSeedBankSaga(action) {
  try {
    const response = yield call(addSeedBankApi, action.payload)
    yield put(addSeedBankSuccess(response))
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: 'Seed bank added successfully',
          type: 'success',
        },
      ])
    )
  } catch (error) {
    yield put(addSeedBankError(error.message))
    console.error('Error in addSeedBankSaga:', error)
  }
}

export function* watchGetSeedsSaga() {
  yield takeLatest(GET_SEEDS_REQUEST, getSeedsSaga)
}

export function* watchAddSeedSaga() {
  yield takeLatest(ADD_SEED_REQUEST, addSeedSaga)
}

export function* watchAddSeedBankSaga() {
  yield takeLatest(ADD_SEED_BANK_REQUEST, addSeedBankSaga)
}

export default function* rootSaga() {
  yield all([fork(watchGetSeedsSaga), fork(watchAddSeedSaga), fork(watchAddSeedBankSaga)])
}
