import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { BASE_URL } = publicRuntimeConfig

export const fetchSeedBanksApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/seedBanks`)
    return response.data
  } catch (error) {
  }
}