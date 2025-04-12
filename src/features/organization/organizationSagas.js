import { call, put, takeLatest } from 'redux-saga/effects'
import {
  registerOrganizationRequest,
  registerOrganizationSuccess,
  registerOrganizationFailure,
} from './organizationActions'
import { registerOrganizationApi } from './organizationApi'

function* registerOrganizationSaga(action) {
  try {
    const response = yield call(registerOrganizationApi, action.payload)
    yield put(registerOrganizationSuccess(response.data))
  } catch (error) {
    yield put(registerOrganizationFailure(error.message))
  }
}

export default function* organizationSagas() {
  yield takeLatest(registerOrganizationRequest.type, registerOrganizationSaga)
}
