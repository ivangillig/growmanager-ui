import { takeLatest, put, call, all, fork, takeEvery } from 'redux-saga/effects'
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
} from '../../constants/ActionsTypes'
import { loginSuccess, logoutSuccess, registerSuccess } from './authActions'
import { signIn, signOutRequest, registerUser } from './authApi'
import Router from 'next/router'
import { getHomeForRole } from '@/lib/AuthUtils'
import axios from 'axios'

function* loginSaga(payload) {
  const { credentials } = payload
  cleanupStorage()
  try {
    const response = yield call(signIn, credentials)
    const { token, user } = response

    if (token) {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      yield put(loginSuccess({ token, user }))
    }

    const homeRoute = getHomeForRole(user.role)
    Router.push(homeRoute)
  } catch (err) {
    // error handler
  }
}

function* logoutSaga() {
  if (
    window.localStorage.getItem('token') ||
    axios.defaults.headers.common['Authorization']
  ) {
    window.loggingOut = true // flag to signal the intention, in case request fails
    try {
      yield call(signOutRequest)
    } catch (error) {
      // silently ignore error, most probably failed due to an expired token
    }
  }

  // Ensure localStorage is cleared and reducer state is reset
  cleanupStorage()
  delete axios.defaults.headers.common['Authorization']
  Router.push('/')
  yield put(logoutSuccess())
}

function* registerSaga(payload) {
  const { credentials } = payload
  try {
    const response = yield call(registerUser, credentials)
    const { token, user } = response

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    yield put(registerSuccess(response))

    const homeRoute = getHomeForRole(user.role)
    Router.push(homeRoute)
  } catch (error) {
    // error handler
  }
}

export function* watchLoginSaga() {
  yield takeEvery(LOGIN_REQUEST, loginSaga)
}

export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga)
}

export function* watchRegisterSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga)
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginSaga),
    fork(watchLogoutSaga),
    fork(watchRegisterSaga),
  ])
}

export function cleanupStorage() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
