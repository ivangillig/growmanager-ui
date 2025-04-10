import {
  GET_SEED_BANKS_REQUEST,
  GET_SEED_BANKS_SUCCESS,
  GET_SEED_BANKS_ERROR,
} from '@/src/constants/ActionsTypes'

const initialState = {
  seedBanks: [],
  loading: false,
  error: null,
}

export default function seedBankReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEED_BANKS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_SEED_BANKS_SUCCESS:
      return {
        ...state,
        loading: false,
        seedBanks: action.payload.seedBanks,
      }
    case GET_SEED_BANKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}