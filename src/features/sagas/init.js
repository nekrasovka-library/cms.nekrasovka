import { call, put, takeLatest } from "redux-saga/effects";
import { fetchInitData } from "../api";

function* fetchInitWorker() {
  try {
    const data = yield call(fetchInitData);
    yield put({ type: "FETCH_HOME_SUCCESS", payload: data });
  } catch (error) {
    yield put({ type: "FETCH_HOME_ERROR", error: error.message });
  }
}

function* init() {
  yield takeLatest("FETCH_HOME_DATA", fetchInitWorker);
}

export { init };
