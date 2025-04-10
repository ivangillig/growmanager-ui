import {
  GET_SEEDS_REQUEST,
  GET_SEEDS_SUCCESS,
  GET_SEEDS_ERROR,
  ADD_SEED_REQUEST,
  ADD_SEED_SUCCESS,
  ADD_SEED_ERROR,
  ADD_SEED_BANK_REQUEST,
  ADD_SEED_BANK_SUCCESS,
  ADD_SEED_BANK_ERROR,
} from '../../constants/ActionsTypes'

const initialState = {
  seeds: [], // Agregamos seedBanks al estado inicial
  seedBanks: [], // Agregamos seedBanks al estado inicial
  loading: false,
  error: null,
}

export default function seedReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEEDS_REQUEST:
    case ADD_SEED_REQUEST:
    case ADD_SEED_BANK_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_SEEDS_SUCCESS:
      return {
        ...state,
        loading: false,
        seeds: action.payload,
      }
    case ADD_SEED_SUCCESS:
      return {
        ...state,
        loading: false,
        seeds: [...state.seeds, action.payload],
      }
    case ADD_SEED_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
        seedBanks: [...state.seedBanks, action.payload], // Agregamos el nuevo seedBank
      }
    case GET_SEEDS_ERROR:
    case ADD_SEED_ERROR:
    case ADD_SEED_BANK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
