import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_ERROR,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
} from '../../constants/ActionsTypes'

const initialState = {
  user: {},
  loading: false,
  error: null,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
