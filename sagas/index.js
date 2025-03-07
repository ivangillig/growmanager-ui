import { all, fork } from 'redux-saga/effects'
import { watchLoginSaga } from './authSagas'

export default function* rootSaga() {
  yield all([fork(watchLoginSaga)])
}
