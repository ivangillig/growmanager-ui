import {
  REGISTER_ORGANIZATION_REQUEST,
  REGISTER_ORGANIZATION_SUCCESS,
  REGISTER_ORGANIZATION_FAILURE,
} from '../../constants/ActionsTypes'

const initialState = {
  registerSuccess: false,
  loading: false,
  error: null,
}

const organizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ORGANIZATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case REGISTER_ORGANIZATION_SUCCESS:
      return {
        ...state,
        loading: false,
        registerSuccess: true,
      }
    case REGISTER_ORGANIZATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default organizationReducer
