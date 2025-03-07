import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../../constants/ActionsTypes'

export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  credentials: credentials,
})

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
})

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
})
