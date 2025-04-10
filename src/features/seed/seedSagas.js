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
    const seeds = yield call(getSeedsApi)

    if (seeds) {
      yield put(getSeedsSuccess(seeds))
    }
  } catch (error) {
    yield put(getSeedsError(error.message))
  }
}

function* addSeedSaga(action) {
  try {
    const seed = yield call(addSeedApi, action.payload)
    yield put(addSeedSuccess(seed))
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
    // Llamada a la API para agregar el banco de semillas
    const response = yield call(addSeedBankApi, action.payload)
    // Despacha la acción de éxito si la API responde correctamente
    yield put(addSeedBankSuccess(response))
    // Opcional: Muestra un mensaje de éxito
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
    // Despacha la acción de error si ocurre un problema
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
