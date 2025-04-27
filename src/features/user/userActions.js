import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
} from '@/src/constants/ActionsTypes'

export const updateUser = (user) => ({
  type: UPDATE_USER_REQUEST,
  payload: user,
})

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
})

export const updateUserError = (error) => ({
  type: UPDATE_USER_ERROR,
  payload: error,
})

export const updatePassword = (passwordData) => ({
  type: UPDATE_PASSWORD_REQUEST,
  payload: passwordData,
})

export const updatePasswordSuccess = () => ({
  type: UPDATE_PASSWORD_SUCCESS,
})

export const updatePasswordError = (error) => ({
  type: UPDATE_PASSWORD_ERROR,
  payload: error,
})
