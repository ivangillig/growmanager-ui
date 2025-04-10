import {
  GET_SEED_BANKS_REQUEST,
  GET_SEED_BANKS_SUCCESS,
  GET_SEED_BANKS_ERROR,
} from '@/src/constants/ActionsTypes'

export const getSeedBanks = () => ({
  type: GET_SEED_BANKS_REQUEST,
})

export const getSeedBanksSuccess = (seedBanks) => ({
  type: GET_SEED_BANKS_SUCCESS,
  payload: seedBanks,
})

export const getSeedBanksError = (error) => ({
  type: GET_SEED_BANKS_ERROR,
  payload: error,
})