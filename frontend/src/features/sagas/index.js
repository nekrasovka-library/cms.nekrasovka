import { all, put, call, takeLatest } from "redux-saga/effects";
import {
  fetchCreateProjectPageApi,
  fetchCreateProjectApi,
  fetchDeleteProjectPageApi,
  fetchProjectApi,
  fetchProjectPageApi,
  fetchProjectsApi,
  fetchUpdateProjectPageApi,
} from "../api.js";
import {
  getProjectFailure,
  getProjectSuccess,
  getProjectsFailure,
  getProjectsSuccess,
  createProjectFailure,
  deleteProjectPageFailure,
  createProjectPageFailure,
  getProjectPageSuccess,
  getProjectPageFailure,
  updateProjectPageFailure,
} from "../actions/index.js";

function* getProject(params) {
  try {
    const response = yield call(fetchProjectApi, params.projectId);
    yield put(getProjectSuccess(response.data));
  } catch (error) {
    yield put(getProjectFailure(error.message));
  }
}

function* getProjectPage(params) {
  try {
    const response = yield call(fetchProjectPageApi, params);
    yield put(getProjectPageSuccess(response.data));
  } catch (error) {
    yield put(getProjectPageFailure(error.message));
  }
}

function* getProjects() {
  try {
    const response = yield call(fetchProjectsApi);
    yield put(getProjectsSuccess(response.data));
  } catch (error) {
    yield put(getProjectsFailure(error.message));
  }
}

function* createProject(action) {
  try {
    yield call(fetchCreateProjectApi, action.payload);
    const response = yield call(fetchProjectsApi);
    yield put(getProjectsSuccess(response.data));
  } catch (error) {
    yield put(createProjectFailure(error.message));
  }
}

function* deleteProjectPage(params) {
  try {
    yield call(fetchDeleteProjectPageApi, params);
    const response = yield call(fetchProjectApi, params.projectId);
    yield put(getProjectSuccess(response.data));
  } catch (error) {
    yield put(deleteProjectPageFailure(error.message));
  }
}

function* createProjectPage(params) {
  try {
    yield call(fetchCreateProjectPageApi, params);
    const response = yield call(fetchProjectApi, params.projectId);
    yield put(getProjectSuccess(response.data));
  } catch (error) {
    yield put(createProjectPageFailure(error.message));
  }
}

function* updateProjectPage(params) {
  try {
    yield call(fetchUpdateProjectPageApi, params);
    const response = yield call(fetchProjectPageApi, params);
    yield put(getProjectPageSuccess(response.data));
  } catch (error) {
    yield put(updateProjectPageFailure(error.message));
  }
}

export function* watchGetProject() {
  yield takeLatest("GET_PROJECT_REQUEST", getProject);
}

export function* watchGetProjectPage() {
  yield takeLatest("GET_PROJECT_PAGE_REQUEST", getProjectPage);
}

export function* watchGetProjects() {
  yield takeLatest("GET_PROJECTS_REQUEST", getProjects);
}

export function* watchCreateProject() {
  yield takeLatest("CREATE_PROJECT_REQUEST", createProject);
}

export function* watchCreateProjectPage() {
  yield takeLatest("CREATE_PROJECT_PAGE_REQUEST", createProjectPage);
}

export function* watchDeleteProjectPage() {
  yield takeLatest("DELETE_PROJECT_PAGE_REQUEST", deleteProjectPage);
}

export function* watchUpdateProjectPage() {
  yield takeLatest("UPDATE_PROJECT_PAGE_REQUEST", updateProjectPage);
}

export default function* rootSaga() {
  yield all([
    watchGetProject(),
    watchGetProjects(),
    watchCreateProject(),
    watchDeleteProjectPage(),
    watchCreateProjectPage(),
    watchGetProjectPage(),
    watchUpdateProjectPage(),
  ]);
}
