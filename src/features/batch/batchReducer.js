import {
  FETCH_BATCHES_REQUEST,
  FETCH_BATCHES_SUCCESS,
  FETCH_BATCHES_ERROR,
  ADD_BATCH_REQUEST,
  ADD_BATCH_SUCCESS,
  ADD_BATCH_ERROR,
  UPDATE_BATCH_REQUEST,
  UPDATE_BATCH_SUCCESS,
  UPDATE_BATCH_ERROR,
  DELETE_BATCH_REQUEST,
  DELETE_BATCH_SUCCESS,
  DELETE_BATCH_ERROR,
} from '../../constants/ActionsTypes'

const initialState = {
  batches: [],
  loading: false,
  error: null,
}

export default function batchReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BATCHES_REQUEST:
    case ADD_BATCH_REQUEST:
    case UPDATE_BATCH_REQUEST:
    case DELETE_BATCH_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_BATCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        batches: action.payload,
      }
    case ADD_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        batches: [...state.batches, action.payload],
      }
    case UPDATE_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        batches: state.batches.map((batch) =>
          batch.id === action.payload.id ? action.payload : batch
        ),
      }
    case DELETE_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        batches: state.batches.filter((batch) => batch.id !== action.payload),
      }
    case FETCH_BATCHES_ERROR:
    case ADD_BATCH_ERROR:
    case UPDATE_BATCH_ERROR:
    case DELETE_BATCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
