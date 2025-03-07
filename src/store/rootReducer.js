import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authReducer'
import seedReducer from '../features/seed/seedReducer'
import notificationReducer from '../features/notifications/notificationReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  seed: seedReducer,
  notification: notificationReducer,
})

export default rootReducer
