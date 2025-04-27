import { all } from 'redux-saga/effects'
import authSagas from '../features/auth/authSagas'
import batchSagas from '../features/batch/batchSagas'
import seedSagas from '../features/seed/seedSagas'
import organizationSagas from '../features/organization/organizationSagas'
import userSagas from '../features/user/userSagas'

export default function* rootSagas() {
  yield all([
    authSagas(),
    batchSagas(),
    seedSagas(),
    organizationSagas(),
    userSagas(),
  ])
}
