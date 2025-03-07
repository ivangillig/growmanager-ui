import { call, put, takeLatest } from 'redux-saga/effects'
import {
  FETCH_PRODUCTS_REQUEST,
  fetchProductsSuccess,
  fetchProductsFailure,
  ADD_PRODUCT_REQUEST,
  addProductSuccess,
  addProductFailure,
} from './productActions'
import { fetchProductsApi, addProductApi } from './productsApi'

function* fetchProductsSaga() {
  try {
    const products = yield call(fetchProductsApi)
    yield put(fetchProductsSuccess(products))
  } catch (error) {
    yield put(fetchProductsFailure(error))
  }
}

function* addProductSaga(action) {
  try {
    const product = yield call(addProductApi, action.payload)
    yield put(addProductSuccess(product))
  } catch (error) {
    yield put(addProductFailure(error))
  }
}

export default function* productSagas() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga)
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga)
}
