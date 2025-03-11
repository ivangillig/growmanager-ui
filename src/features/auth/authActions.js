import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
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

export const logout = () => ({
  type: LOGOUT_REQUEST,
})

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
})