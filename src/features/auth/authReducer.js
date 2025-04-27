import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  UPDATE_USER_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_ORGANIZATION_SUCCESS,
} from '../../constants/ActionsTypes'

const initialState = {
  token:
    typeof window !== 'undefined'
      ? localStorage.getItem('token') || undefined
      : undefined,
  user:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user')) || undefined
      : undefined,
  loading: false,
  error: null,
  loginSuccess: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        loginSuccess: true,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        loginSuccess: true,
      }
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case LOGOUT_SUCCESS:
      return initialState
    case REGISTER_ORGANIZATION_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          organization: action.payload,
        },
      }
    case UPDATE_USER_SUCCESS:
      const updatedUser = { ...state.user, ...action.payload }
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
      return {
        ...state,
        loading: false,
        user: updatedUser,
      }
    default:
      return state
  }
}

export default authReducer
