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
import { showMessage } from '@/src/features/notifications/notificationActions'

function* getSeedsSaga() {
  try {
    const seeds = yield call(getSeedsApi)

    if (seeds) {
      yield put(getSeedsSuccess(seeds))
      yield put(
        showMessage([
          {
            summary: 'Success',
            detail: 'Seeds fetched successfully',
            type: 'success',
          },
        ])
      )
    }
  } catch (error) {}
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
  } catch (error) {}
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
