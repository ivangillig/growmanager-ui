import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { BASE_URL } = publicRuntimeConfig

export const updateUserApi = async (user) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/user`, user)
    return response.data
  } catch (error) {
    throw new Error('Failed to update user')
  }
}

export const updatePasswordApi = async (passwordData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/change-password`,
      passwordData
    )
    return response.data
  } catch (error) {
    throw new Error('Failed to update password')
  }
}
