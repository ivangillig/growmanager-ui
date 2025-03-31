import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { BASE_URL } = publicRuntimeConfig

export const getSeedsApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/seeds`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch seeds')
  }
}

export const addSeedApi = async (seed) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/seeds`, seed, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to add seed')
  }
}

export const fetchSeedBanks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/seeds`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching seed banks:')
  }
}
