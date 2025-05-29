import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authReducer'
import seedReducer from '../features/seed/seedReducer'
import seedBankReducer from '../features/seedBank/seedBankReducer'
import batchReducer from '../features/batch/batchReducer'
import notificationReducer from '../features/notifications/notificationReducer'
import organizationReducer from '../features/organization/organizationReducer'
import { LOGIN_REQUEST } from '../constants/ActionsTypes'

const reducers = combineReducers({
  auth: authReducer,
  seed: seedReducer,
  seedBank: seedBankReducer,
  batch: batchReducer,
  notification: notificationReducer,
  organization: organizationReducer,
})

const rootReducer = (state, action) => {
  if (action.type === LOGIN_REQUEST) {
    state.auth = undefined
  }

  return reducers(state, action)
}

export default rootReducer
