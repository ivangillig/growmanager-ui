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
import { notification } from 'antd'

function* fetchBatchesSaga() {
  try {
    const batches = yield call(fetchBatchesApi)
    yield put(fetchBatchesSuccess(batches))
  } catch (error) {
    yield put(fetchBatchesError(error))
  }
}

function* addBatchSaga({ payload }) {
  try {
    const data = yield call(addBatchApi, payload)
    yield put(addBatchSuccess(data))
    notification.success({ message: 'Batch added successfully' })
  } catch (error) {
    yield put(addBatchError(error))
  }
}

function* updateBatchSaga(action) {
  try {
    const batch = yield call(updateBatchApi, action.payload)
    yield put(updateBatchSuccess(batch))
    notification.success({ message: 'Batch updated successfully' })
  } catch (error) {
    yield put(updateBatchError(error))
  }
}

function* deleteBatchSaga(action) {
  try {
    yield call(deleteBatchApi, action.payload)
    yield put(deleteBatchSuccess(action.payload))
    notification.success({ message: 'Batch deleted successfully' })
  } catch (error) {
    yield put(deleteBatchError(error))
  }
}

function* addBatchLogSaga({ payload }) {
  try {
    const data = yield call(addBatchLogApi, payload)
    yield put(addBatchLogSuccess(data.batchLog))
    notification.success({ message: 'Batch log added successfully' })
  } catch (error) {
    yield put(addBatchLogError(error))
  }
}

function* updateBatchLogSaga(action) {
  try {
    const batchLog = yield call(updateBatchLogApi, action.payload)
    yield put(updateBatchLogSuccess(batchLog))
    notification.success({ message: 'Batch log updated successfully' })
  } catch (error) {
    yield put(updateBatchLogError(error))
  }
}

function* deleteBatchLogSaga(action) {
  try {
    yield call(deleteBatchLogApi, action.payload)
    yield put(deleteBatchLogSuccess(action.payload))
    notification.success({ message: 'Batch log deleted successfully' })
  } catch (error) {
    yield put(deleteBatchLogError(error))
  }
}

function* fetchBatchLogsSaga(action) {
  try {
    const response = yield call(fetchBatchLogsApi, action.payload)
    yield put(fetchBatchLogsSuccess(response.data))
  } catch (error) {
    yield put(fetchBatchLogsError(error))
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
