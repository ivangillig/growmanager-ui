import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authReducer'
import seedReducer from '../features/seed/seedReducer'
import batchReducer from '../features/batch/batchReducer'
import notificationReducer from '../features/notifications/notificationReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  seed: seedReducer,
  batch: batchReducer,
  notification: notificationReducer,
})

export default rootReducer
