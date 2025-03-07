import { call, put, takeLatest, all, fork } from 'redux-saga/effects'
import {
  getProductsSuccess,
  getProductsError,
  addProductSuccess,
  addProductError,
} from './productActions'
import {
  GET_PRODUCTS_REQUEST,
  ADD_PRODUCT_REQUEST,
} from '@/src/constants/ActionsTypes'
import { getProductsApi, addProductApi } from './productsApi'

function* getProductsSaga() {
  try {
    const products = yield call(getProductsApi)
    yield put(getProductsSuccess(products))
  } catch (error) {
    yield put(getProductsError(error))
  }
}

function* addProductSaga(action) {
  try {
    const product = yield call(addProductApi, action.payload)
    yield put(addProductSuccess(product))
  } catch (error) {
    yield put(addProductError(error))
  }
}

export function* watchGetProductsSaga() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductsSaga)
}

export function* watchAddProductSaga() {
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga)
}

export default function* rootSaga() {
  yield all([fork(watchGetProductsSaga), fork(watchAddProductSaga)])
}
