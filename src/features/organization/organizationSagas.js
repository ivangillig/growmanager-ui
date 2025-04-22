import { call, put, takeLatest } from 'redux-saga/effects'
import { REGISTER_ORGANIZATION_REQUEST } from '../../constants/ActionsTypes'
import { registerOrganizationSuccess } from './organizationActions'
import { registerOrganizationApi } from './organizationApi'

function* registerOrganizationSaga(action) {
  try {
    const response = yield call(registerOrganizationApi, action.payload)
    yield put(registerOrganizationSuccess(response.organization))

    const user = JSON.parse(localStorage.getItem('user')) || {}
    user.organization = response.organization
    localStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    // handled in the middleware
  }
}

export default function* organizationSagas() {
  yield takeLatest(REGISTER_ORGANIZATION_REQUEST, registerOrganizationSaga)
}
