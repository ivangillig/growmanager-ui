import { createReducer } from '@reduxjs/toolkit'
import {
  registerOrganizationRequest,
  registerOrganizationSuccess,
  registerOrganizationFailure,
} from './organizationActions'

const initialState = {
  registerSuccess: false,
  loading: false,
  error: null,
}

const organizationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerOrganizationRequest, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(registerOrganizationSuccess, (state) => {
      state.loading = false
      state.registerSuccess = true
    })
    .addCase(registerOrganizationFailure, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
})

export default organizationReducer
