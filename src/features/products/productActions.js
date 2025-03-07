import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
} from '@/src/constants/ActionsTypes'

export const getProducts = () => ({
  type: GET_PRODUCTS_REQUEST,
})

export const getProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
})

export const getProductsError = (error) => ({
  type: GET_PRODUCTS_ERROR,
  payload: error,
})

export const addProduct = (product) => ({
  type: ADD_PRODUCT_REQUEST,
  payload: product,
})

export const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
})

export const addProductError = (error) => ({
  type: ADD_PRODUCT_ERROR,
  payload: error,
})
