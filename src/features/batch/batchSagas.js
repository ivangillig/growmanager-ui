import { call, put, takeLatest, all, fork } from 'redux-saga/effects'
import {
  fetchBatchesSuccess,
  fetchBatchesError,
  addBatchSuccess,
  addBatchError,
  updateBatchSuccess,
  updateBatchError,
  deleteBatchSuccess,
  deleteBatchError,
} from './batchActions'
import {
  FETCH_BATCHES_REQUEST,
  ADD_BATCH_REQUEST,
  UPDATE_BATCH_REQUEST,
  DELETE_BATCH_REQUEST,
} from '@/src/constants/ActionsTypes'
import {
  fetchBatchesApi,
  addBatchApi,
  updateBatchApi,
  deleteBatchApi,
} from './batchApi'

function* fetchBatchesSaga() {
  try {
    const batches = yield call(fetchBatchesApi)
    yield put(fetchBatchesSuccess(batches))
  } catch (error) {
    yield put(fetchBatchesError(error))
  }
}

function* addBatchSaga({payload}) {
  try {
    const data = yield call(addBatchApi, payload)
    yield put(addBatchSuccess(data))
  } catch (error) {
    yield put(addBatchError(error))
  }
}

function* updateBatchSaga(action) {
  try {
    const batch = yield call(updateBatchApi, action.payload)
    yield put(updateBatchSuccess(batch))
  } catch (error) {
    yield put(updateBatchError(error))
  }
}

function* deleteBatchSaga(action) {
  try {
    yield call(deleteBatchApi, action.payload)
    yield put(deleteBatchSuccess(action.payload))
  } catch (error) {
    yield put(deleteBatchError(error))
  }
}

export function* watchFetchBatchesSaga() {
  yield takeLatest(FETCH_BATCHES_REQUEST, fetchBatchesSaga)
}

export function* watchAddBatchSaga() {
  yield takeLatest(ADD_BATCH_REQUEST, addBatchSaga)
}

export function* watchUpdateBatchSaga() {
  yield takeLatest(UPDATE_BATCH_REQUEST, updateBatchSaga)
}

export function* watchDeleteBatchSaga() {
  yield takeLatest(DELETE_BATCH_REQUEST, deleteBatchSaga)
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchBatchesSaga),
    fork(watchAddBatchSaga),
    fork(watchUpdateBatchSaga),
    fork(watchDeleteBatchSaga),
  ])
}
