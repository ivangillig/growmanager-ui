import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { BASE_URL } = publicRuntimeConfig

export const fetchBatchesApi = async (payload) => {
  const { page = 1, limit = 10, batchCode, germinationDate, genetic } = payload
  const filterParams = new URLSearchParams({
    ...(batchCode && { batchCode }),
    ...(germinationDate && { germinationDate }),
    ...(genetic && { genetic }),
  }).toString()

  try {
    const response = await axios.get(
      `${BASE_URL}/api/batch?page=${page}&limit=${limit}&${filterParams}`
    )
    return response.data.data
  } catch (error) {
    // error handler
  }
}

export const addBatchApi = async (batch) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/batch`, batch, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    // error handler
  }
}

export const updateBatchApi = async (batch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/batch/${batch.id}`,
      batch,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    // error handler
  }
}

export const deleteBatchApi = async (batchId) => {
  try {
    await axios.delete(`${BASE_URL}/api/batch/${batchId}`)
  } catch (error) {
    // error handler
  }
}

export const addBatchLogApi = async (batchLog) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/batchlog`, batchLog, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    // error handler
  }
}

export const updateBatchLogApi = async (batchLog) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/batchlog`, batchLog)
    return response.data
  } catch (error) {
    // error handler
  }
}

export const deleteBatchLogApi = async (batchLogId) => {
  try {
    await axios.delete(`${BASE_URL}/api/batchlog/${batchLogId}`)
  } catch (error) {
    // error handler
  }
}

export const fetchBatchLogsApi = async (payload) => {
  const { batchId, page = 1, limit = 10, filter, sort } = payload

  const filterParams = new URLSearchParams(filter).toString()
  const sortParams = sort
    ? `&sortField=${sort.field}&sortOrder=${sort.order}`
    : ''

  const response = await axios.get(
    `${BASE_URL}/api/batchlog/${batchId}?page=${page}&limit=${limit}&${filterParams}&${sortParams}`
  )
  return response.data
}
