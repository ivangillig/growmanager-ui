import { takeLatest, put, call, all, fork } from 'redux-saga/effects'
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../../constants/ActionsTypes'
import { loginSuccess, logoutSuccess } from './authActions'
import { signIn, signOutRequest } from './authApi'
import Router from 'next/router'
import { getHomeForRole } from '@/lib/AuthUtils'
import axios from 'axios'

function* loginSaga(payload) {
  const { credentials } = payload
  try {
    const response = yield call(signIn, credentials)
    const { token, user } = response

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    yield put(loginSuccess({ token, user }))

    const homeRoute = getHomeForRole(user.role)
    Router.push(homeRoute)
  } catch (error) {
    // error handler
  }
}

function* logoutSaga() {
  let response
  if (
    window.localStorage.getItem('token') ||
    axios.defaults.headers.common['Authorization']
  ) {
    window.loggingOut = true // flag to signal the intention, in case request fails
    try {
      response = yield call(signOutRequest)
      if (response) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        Router.push('/')
        yield put(logoutSuccess())
      }
    } catch (error) {
      // silently ignore error, most probably failed due to an expired token
    }
  }
}

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga)
}

export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga)
}

export default function* rootSaga() {
  yield all([fork(watchLoginSaga), fork(watchLogoutSaga)])
}
