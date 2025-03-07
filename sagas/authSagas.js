import { takeLatest, put, call, all, fork } from "redux-saga/effects";
import { LOGIN_REQUEST } from "../constants/ActionsTypes";
import { loginSuccess, loginFailure } from "../actions/authActions";
import { authAPI } from "../services/api";
import Cookies from "js-cookie";
import { signIn } from "../services/authApi";

function* loginSaga(action) {
  try {
    const response = yield call(signIn, action.payload);
    const { token, user } = response.data;
    Cookies.set("token", token);
    
    console.log("asdasd");
    yield put(loginSuccess({ token, user }));
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

export default function* rootSaga() {
  yield all([fork(watchLoginSaga)]);
}
