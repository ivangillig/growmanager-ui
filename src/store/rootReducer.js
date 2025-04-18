import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authReducer'
import seedReducer from '../features/seed/seedReducer'
import batchReducer from '../features/batch/batchReducer'
import notificationReducer from '../features/notifications/notificationReducer'
import { LOGOUT_SUCCESS } from '../constants/ActionsTypes'

const reducers = combineReducers({
  auth: authReducer,
  seed: seedReducer,
  batch: batchReducer,
  notification: notificationReducer,
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined
  }

  return reducers(state, action)
}

export default rootReducer
