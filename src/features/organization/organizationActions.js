import { 
  REGISTER_ORGANIZATION_REQUEST,
  REGISTER_ORGANIZATION_SUCCESS,
  REGISTER_ORGANIZATION_FAILURE,
} from '../../constants/ActionsTypes'

export const registerOrganizationRequest = (data) => ({
  type: REGISTER_ORGANIZATION_REQUEST,
  payload: data,
})

export const registerOrganizationSuccess = (organization) => ({
  type: REGISTER_ORGANIZATION_SUCCESS,
  payload: organization,
})

export const registerOrganizationFailure = (error) => ({
  type: REGISTER_ORGANIZATION_FAILURE,
  payload: error,
})
