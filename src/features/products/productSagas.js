import { call, put, takeLatest, all, fork } from 'redux-saga/effects'
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductSuccess,
  addProductFailure,
} from './productActions'
import {
  FETCH_PRODUCTS_REQUEST,
  ADD_PRODUCT_REQUEST,
} from '@/src/constants/ActionsTypes'
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

export function* watchFetchProductsSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga)
}

export function* watchAddProductSaga() {
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga)
}

export default function* rootSaga() {
  yield all([fork(watchFetchProductsSaga), fork(watchAddProductSaga)])
}
