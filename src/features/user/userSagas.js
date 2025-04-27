import { call, put, takeLatest, all, fork } from 'redux-saga/effects'
import { updateUserSuccess, updateUserError } from './userActions'
import {
  UPDATE_USER_REQUEST,
  UPDATE_PASSWORD_REQUEST,
} from '@/src/constants/ActionsTypes'
import { updateUserApi, updatePasswordApi } from './userApi'
import { showMessage } from '@/src/features/notifications/notificationActions'
import { updatePasswordSuccess, updatePasswordError } from './userActions'

function* updateUserSaga({ payload }) {
  try {
    const response = yield call(updateUserApi, payload)
    yield put(updateUserSuccess(response.data))
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: response.message,
          type: 'success',
        },
      ])
    )
  } catch (error) {
    yield put(updateUserError(error.message))
  }
}

function* updatePasswordSaga({ payload }) {
  try {
    yield call(updatePasswordApi, payload)
    yield put(updatePasswordSuccess())
    yield put(
      showMessage([
        {
          summary: 'Success',
          detail: 'Password updated successfully',
          type: 'success',
        },
      ])
    )
  } catch (error) {
    yield put(updatePasswordError(error.message))
  }
}

export function* watchUpdateUserSaga() {
  yield takeLatest(UPDATE_USER_REQUEST, updateUserSaga)
}

export function* watchUpdatePasswordSaga() {
  yield takeLatest(UPDATE_PASSWORD_REQUEST, updatePasswordSaga)
}

export default function* userSagas() {
  yield all([fork(watchUpdateUserSaga), fork(watchUpdatePasswordSaga)])
}
