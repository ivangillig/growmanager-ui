import { takeLatest, put, call, all, fork } from 'redux-saga/effects'
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../../constants/ActionsTypes'
import { loginSuccess, logoutSuccess } from './authActions'
import { signIn, signOutRequest } from './authApi'
import Router from 'next/router'

function* loginSaga(payload) {
  const { credentials } = payload
  try {
    const response = yield call(signIn, credentials)
    const { token, user } = response

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    yield put(loginSuccess({ token, user }))
  } catch (error) {
    // error handler
  }
}

function* logoutSaga() {
  try {
    const response = yield call(signOutRequest)
    if (response) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    Router.push('/login')
    yield put(logoutSuccess())
  } catch (error) {
    // error handler
  }
}

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga)
}

export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga)
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginSaga),
    fork(watchLogoutSaga),
  ])
}
