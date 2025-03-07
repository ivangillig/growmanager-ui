import { takeLatest, put, call, all, fork } from 'redux-saga/effects'
import { LOGIN_REQUEST } from '../constants/ActionsTypes'
import { loginSuccess, loginFailure } from '../actions'
import Cookies from 'js-cookie'
import { signIn } from '../api'

function* loginSaga(payload) {
  const { credentials } = payload
  try {
    const response = yield call(signIn, credentials)
    const { token, user } = response
    // Cookies.set("token", token);
    console.log('respuesta de login')
    yield put(loginSuccess({ token, user }))
  } catch (error) {
    // yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga)
}

export default function* rootSaga() {
  yield all([fork(watchLoginSaga)])
}
