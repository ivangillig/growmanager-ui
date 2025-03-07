import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
} from './productActions'

const initialState = {
  items: [],
  loading: false,
  error: null,
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      }
    case GET_PRODUCTS_ERROR:
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
