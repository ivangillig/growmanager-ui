import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authReducer'
import productReducer from '../features/products/productReducer'
import notificationReducer from '../features/notifications/notificationReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    notification: notificationReducer
})

export default rootReducer
