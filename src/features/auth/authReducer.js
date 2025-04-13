import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from '../../constants/ActionsTypes'

const initialState = {
  token:
    typeof window !== 'undefined'
      ? localStorage.getItem('token') || null
      : null,
  user:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || 'null')
      : null,
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
        user: {
          id: action.payload.user.id,
          email: action.payload.user.email,
        },
        token: action.payload.token,
        role: action.payload.user.role,
        loginSuccess: true,
      }
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}

export default authReducer
