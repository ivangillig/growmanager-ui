import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../../constants/ActionsTypes";

const initialState = {
  user: {
    id: null,
    email: null,
  },
  token: null,
  loading: false,
  error: null,
  loginSuccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          id: action.payload.user.id,
          email: action.payload.user.email,
        },
        token: action.payload.token,
        loginSuccess: true,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
