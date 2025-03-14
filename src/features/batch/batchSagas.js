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
  addBatchLogSuccess,
  addBatchLogError,
  updateBatchLogSuccess,
  updateBatchLogError,
  deleteBatchLogSuccess,
  deleteBatchLogError,
  fetchBatchLogsSuccess,
  fetchBatchLogsError,
} from './batchActions'
import {
  FETCH_BATCHES_REQUEST,
  ADD_BATCH_REQUEST,
  UPDATE_BATCH_REQUEST,
  DELETE_BATCH_REQUEST,
  ADD_BATCH_LOG_REQUEST,
  UPDATE_BATCH_LOG_REQUEST,
  DELETE_BATCH_LOG_REQUEST,
  FETCH_BATCH_LOGS_REQUEST,
} from '@/src/constants/ActionsTypes'
import {
  fetchBatchesApi,
  addBatchApi,
  updateBatchApi,
  deleteBatchApi,
  addBatchLogApi,
  updateBatchLogApi,
  deleteBatchLogApi,
  fetchBatchLogsApi,
} from './batchApi'
import { showMessage } from '../notifications/notificationActions'

function* fetchBatchesSaga() {
  try {
    const batches = yield call(fetchBatchesApi)
    yield put(fetchBatchesSuccess(batches))
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: 'Batches fetched successfully',
          type: 'success',
        },
      ])
    )
  } catch (error) {
    yield put(fetchBatchesError(error))
  }
}

function* addBatchSaga({ payload }) {
  try {
    const data = yield call(addBatchApi, payload)
    yield put(addBatchSuccess(data))
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: 'Batch added successfully',
          type: 'success',
        },
      ])
    )
  } catch (error) {
    yield put(addBatchError(error))
  }
}

function* updateBatchSaga(action) {
  try {
    const batch = yield call(updateBatchApi, action.payload)
    yield put(updateBatchSuccess(batch))
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: 'Batch updated successfully',
          type: 'success',
        },
      ])
    )
  } catch (error) {}
}

function* deleteBatchSaga(action) {
  try {
    yield call(deleteBatchApi, action.payload)
    yield put(deleteBatchSuccess(action.payload))
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: 'Batch deleted successfully',
          type: 'success',
        },
      ])
    )
  } catch (error) {}
}

function* addBatchLogSaga({ payload }) {
  try {
    const data = yield call(addBatchLogApi, payload)
    yield put(addBatchLogSuccess(data.batchLog))
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: 'Batch log added successfully',
          type: 'success',
        },
      ])
    )
  } catch (error) {}
}

function* updateBatchLogSaga(action) {
  try {
    const batchLog = yield call(updateBatchLogApi, action.payload)
    yield put(updateBatchLogSuccess(batchLog))
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: 'Batch log updated successfully',
          type: 'success',
        },
      ])
    )
  } catch (error) {}
}

function* deleteBatchLogSaga(action) {
  try {
    yield call(deleteBatchLogApi, action.payload)
    yield put(deleteBatchLogSuccess(action.payload))
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: 'Batch log deleted successfully',
          type: 'success',
        },
      ])
    )
  } catch (error) {}
}

function* fetchBatchLogsSaga(action) {
  try {
    const response = yield call(fetchBatchLogsApi, action.payload)
    yield put(fetchBatchLogsSuccess(response.data))
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: 'Batch logs fetched successfully',
          type: 'success',
        },
      ])
    )
  } catch (error) {}
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

export function* watchAddBatchLogSaga() {
  yield takeLatest(ADD_BATCH_LOG_REQUEST, addBatchLogSaga)
}

export function* watchUpdateBatchLogSaga() {
  yield takeLatest(UPDATE_BATCH_LOG_REQUEST, updateBatchLogSaga)
}

export function* watchDeleteBatchLogSaga() {
  yield takeLatest(DELETE_BATCH_LOG_REQUEST, deleteBatchLogSaga)
}

export function* watchFetchBatchLogsSaga() {
  yield takeLatest(FETCH_BATCH_LOGS_REQUEST, fetchBatchLogsSaga)
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchBatchesSaga),
    fork(watchAddBatchSaga),
    fork(watchUpdateBatchSaga),
    fork(watchDeleteBatchSaga),
    fork(watchAddBatchLogSaga),
    fork(watchUpdateBatchLogSaga),
    fork(watchDeleteBatchLogSaga),
    fork(watchFetchBatchLogsSaga),
  ])
}
