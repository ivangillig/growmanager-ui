import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
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

export const registerRequest = (credentials) => ({
  type: REGISTER_REQUEST,
  credentials: credentials,
})

export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data,
})

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
})
