import {
  GET_SEEDS_REQUEST,
  GET_SEEDS_SUCCESS,
  GET_SEEDS_ERROR,
  ADD_SEED_REQUEST,
  ADD_SEED_SUCCESS,
  ADD_SEED_ERROR,
} from '@/src/constants/ActionsTypes'

export const getSeeds = () => ({
  type: GET_SEEDS_REQUEST,
})

export const getSeedsSuccess = (seeds) => ({
  type: GET_SEEDS_SUCCESS,
  payload: seeds,
})

export const getSeedsError = (error) => ({
  type: GET_SEEDS_ERROR,
  payload: error,
})

export const addSeed = (seed) => ({
  type: ADD_SEED_REQUEST,
  payload: seed,
})

export const addSeedSuccess = (seed) => ({
  type: ADD_SEED_SUCCESS,
  payload: seed,
})

export const addSeedError = (error) => ({
  type: ADD_SEED_ERROR,
  payload: error,
})
