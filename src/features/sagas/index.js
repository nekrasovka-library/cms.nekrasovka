import { all, put, call, takeLatest } from "redux-saga/effects";
import {
  fetchCreateProjectPageToApi,
  fetchCreateProjectToApi,
  fetchDeleteProjectPageToApi,
  fetchProjectFromApi,
  fetchProjectsFromApi,
} from "../api.js";
import {
  getProjectFailure,
  getProjectSuccess,
  getProjectsFailure,
  getProjectsSuccess,
  createProjectFailure,
  deleteProjectPageFailure,
  createProjectPageFailure,
} from "../actions";

function* getProject(params) {
  try {
    const response = yield call(fetchProjectFromApi, params.projectId);
    yield put(getProjectSuccess(response.data));
  } catch (error) {
    yield put(getProjectFailure(error.message));
  }
}

function* getProjects() {
  try {
    const response = yield call(fetchProjectsFromApi);
    yield put(getProjectsSuccess(response.data));
  } catch (error) {
    yield put(getProjectsFailure(error.message));
  }
}

function* createProject(action) {
  try {
    yield call(fetchCreateProjectToApi, action.payload);
    const response = yield call(fetchProjectsFromApi);
    yield put(getProjectsSuccess(response.data));
  } catch (error) {
    yield put(createProjectFailure(error.message));
  }
}

function* deleteProjectPage(params) {
  try {
    yield call(fetchDeleteProjectPageToApi, params);
    const response = yield call(fetchProjectFromApi, params.projectId);
    yield put(getProjectSuccess(response.data));
  } catch (error) {
    yield put(deleteProjectPageFailure(error.message));
  }
}

function* createProjectPage(params) {
  try {
    yield call(fetchCreateProjectPageToApi, params);
    const response = yield call(fetchProjectFromApi, params.projectId);
    yield put(getProjectSuccess(response.data));
  } catch (error) {
    yield put(createProjectPageFailure(error.message));
  }
}

export function* watchGetProject() {
  yield takeLatest("GET_PROJECT_REQUEST", getProject);
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

export default function* rootSaga() {
  yield all([
    watchGetProject(),
    watchGetProjects(),
    watchCreateProject(),
    watchDeleteProjectPage(),
    watchCreateProjectPage(),
  ]);
}
