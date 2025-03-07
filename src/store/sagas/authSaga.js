import { takeLatest, put, call } from "redux-saga/effects";
import { LOGIN_REQUEST } from "../../constants/actions";
import { loginSuccess, loginFailure } from "../../actions/authActions";
import axiosInstance from "../../libs/axiosConfig";
import Cookies from "js-cookie";

function* loginSaga(action) {
  try {
    const response = yield call(
      axiosInstance.post,
      "/auth/login",
      action.payload
    );

    const { token, user } = response.data;
    Cookies.set("token", token);

    yield put(loginSuccess({ token, user }));
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

export function* watchAuth() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
