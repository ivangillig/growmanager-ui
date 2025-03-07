import { takeLatest, put, call, all, fork } from 'redux-saga/effects'
import { LOGIN_REQUEST } from '../../constants/ActionsTypes'
import { loginSuccess, loginFailure } from './authActions'

import { signIn } from './authApi'

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

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga)
}

export default function* rootSaga() {
  yield all([fork(watchLoginSaga)])
}
