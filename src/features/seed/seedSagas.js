import { call, put, takeLatest, all, fork } from 'redux-saga/effects'
import {
  getSeedsSuccess,
  getSeedsError,
  addSeedSuccess,
  addSeedError,
} from './seedActions'
import {
  GET_SEEDS_REQUEST,
  ADD_SEED_REQUEST,
} from '@/src/constants/ActionsTypes'
import { getSeedsApi, addSeedApi } from './seedApi'

function* getSeedsSaga() {
  try {
    const seeds = yield call(getSeedsApi)

    if (seeds) {
      yield put(getSeedsSuccess(seeds))
    }
  } catch (error) {
    yield put(getSeedsError(error))
  }
}

function* addSeedSaga(action) {
  try {
    const seed = yield call(addSeedApi, action.payload)
    yield put(addSeedSuccess(seed))
  } catch (error) {
    yield put(addSeedError(error))
  }
}

export function* watchGetSeedsSaga() {
  yield takeLatest(GET_SEEDS_REQUEST, getSeedsSaga)
}

export function* watchAddSeedSaga() {
  yield takeLatest(ADD_SEED_REQUEST, addSeedSaga)
}

export default function* rootSaga() {
  yield all([fork(watchGetSeedsSaga), fork(watchAddSeedSaga)])
}
