// app/api/auth.js
import axios from 'axios'

export const getUserInfoApi = async () => {
  try {
    const response = await axios.get(`/api/auth/getUserInfo`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const signOutRequest = async () => {
  try {
    const response = await axios.post(
      `/api/auth/logout`,
      {},
      { withCredentials: true }
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const signIn = async (credentials) => {
  try {
    const response = await axios.post(
      `/api/auth/login`,
      credentials,
      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const registerUser = async (credentials) => {
  try {
    const response = await axios.post(
      `/api/auth/register`,
      credentials,
      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error) {
    throw error
  }
}
