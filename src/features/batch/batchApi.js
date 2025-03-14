import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { BASE_URL } = publicRuntimeConfig

export const fetchBatchesApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/batch`)
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
  const { batchId, page, limit } = payload
  try {
    const response = await axios.get(`${BASE_URL}/api/batchlog/${batchId}?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    // error handler
  }
}
