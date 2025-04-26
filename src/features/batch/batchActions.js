import {
  FETCH_BATCHES_REQUEST,
  FETCH_BATCHES_SUCCESS,
  FETCH_BATCHES_ERROR,
  ADD_BATCH_REQUEST,
  ADD_BATCH_SUCCESS,
  ADD_BATCH_ERROR,
  UPDATE_BATCH_REQUEST,
  UPDATE_BATCH_SUCCESS,
  UPDATE_BATCH_ERROR,
  DELETE_BATCH_REQUEST,
  DELETE_BATCH_SUCCESS,
  DELETE_BATCH_ERROR,
  ADD_BATCH_LOG_REQUEST,
  ADD_BATCH_LOG_SUCCESS,
  ADD_BATCH_LOG_ERROR,
  UPDATE_BATCH_LOG_REQUEST,
  UPDATE_BATCH_LOG_SUCCESS,
  UPDATE_BATCH_LOG_ERROR,
  DELETE_BATCH_LOG_REQUEST,
  DELETE_BATCH_LOG_SUCCESS,
  DELETE_BATCH_LOG_ERROR,
  FETCH_BATCH_LOGS_REQUEST,
  FETCH_BATCH_LOGS_SUCCESS,
  FETCH_BATCH_LOGS_ERROR,
} from '@/src/constants/ActionsTypes'

export const fetchBatches = (params) => ({
  type: FETCH_BATCHES_REQUEST,
  payload: params,
})

export const fetchBatchesSuccess = (batches) => ({
  type: FETCH_BATCHES_SUCCESS,
  payload: batches,
})

export const fetchBatchesError = (error) => ({
  type: FETCH_BATCHES_ERROR,
  payload: error,
})

export const addBatch = (batch) => ({
  type: ADD_BATCH_REQUEST,
  payload: batch,
})

export const addBatchSuccess = (batch) => ({
  type: ADD_BATCH_SUCCESS,
  payload: batch,
})

export const addBatchError = (error) => ({
  type: ADD_BATCH_ERROR,
  payload: error,
})

export const updateBatch = (batch) => ({
  type: UPDATE_BATCH_REQUEST,
  payload: batch,
})

export const updateBatchSuccess = (batch) => ({
  type: UPDATE_BATCH_SUCCESS,
  payload: batch,
})

export const updateBatchError = (error) => ({
  type: UPDATE_BATCH_ERROR,
  payload: error,
})

export const deleteBatch = (batchId) => ({
  type: DELETE_BATCH_REQUEST,
  payload: batchId,
})

export const deleteBatchSuccess = (batchId) => ({
  type: DELETE_BATCH_SUCCESS,
  payload: batchId,
})

export const deleteBatchError = (error) => ({
  type: DELETE_BATCH_ERROR,
  payload: error,
})

export const addBatchLog = (batchLog) => ({
  type: ADD_BATCH_LOG_REQUEST,
  payload: batchLog,
})

export const addBatchLogSuccess = (batchLog) => ({
  type: ADD_BATCH_LOG_SUCCESS,
  payload: batchLog,
})

export const addBatchLogError = (error) => ({
  type: ADD_BATCH_LOG_ERROR,
  payload: error,
})

export const updateBatchLog = (batchLog) => ({
  type: UPDATE_BATCH_LOG_REQUEST,
  payload: batchLog,
})

export const updateBatchLogSuccess = (batchLog) => ({
  type: UPDATE_BATCH_LOG_SUCCESS,
  payload: batchLog,
})

export const updateBatchLogError = (error) => ({
  type: UPDATE_BATCH_LOG_ERROR,
  payload: error,
})

export const deleteBatchLog = (batchLogId) => ({
  type: DELETE_BATCH_LOG_REQUEST,
  payload: batchLogId,
})

export const deleteBatchLogSuccess = (batchLogId) => ({
  type: DELETE_BATCH_LOG_SUCCESS,
  payload: batchLogId,
})

export const deleteBatchLogError = (error) => ({
  type: DELETE_BATCH_LOG_ERROR,
  payload: error,
})

export const fetchBatchLogs = (payload) => ({
  type: FETCH_BATCH_LOGS_REQUEST,
  payload: payload,
})

export const fetchBatchLogsSuccess = (batchLogs) => ({
  type: FETCH_BATCH_LOGS_SUCCESS,
  payload: batchLogs,
})

export const fetchBatchLogsError = (error) => ({
  type: FETCH_BATCH_LOGS_ERROR,
  payload: error,
})
