import { createAction } from '@reduxjs/toolkit'

export const registerOrganizationRequest = createAction(
  'organization/registerOrganizationRequest'
)
export const registerOrganizationSuccess = createAction(
  'organization/registerOrganizationSuccess'
)
export const registerOrganizationFailure = createAction(
  'organization/registerOrganizationFailure'
)
