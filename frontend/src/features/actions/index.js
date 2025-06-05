const getProjectPageSuccess = (project) => ({
  type: "GET_PROJECT_PAGE_SUCCESS",
  payload: project,
});

const getProjectPageFailure = (project) => ({
  type: "GET_PROJECT_PAGE_FAILURE",
  payload: project,
});

const getProjectSuccess = (project) => ({
  type: "GET_PROJECT_SUCCESS",
  payload: project,
});

const getProjectFailure = (error) => ({
  type: "GET_PROJECT_FAILURE",
  payload: error,
});

const getProjectsSuccess = (project) => ({
  type: "GET_PROJECTS_SUCCESS",
  payload: project,
});

const getProjectsFailure = (error) => ({
  type: "GET_PROJECTS_FAILURE",
  payload: error,
});

const createProjectFailure = (error) => ({
  type: "CREATE_PROJECT_FAILURE",
  payload: error,
});

const createProjectPageFailure = (error) => ({
  type: "CREATE_PROJECT_PAGE_FAILURE",
  payload: error,
});

const deleteProjectPageFailure = (error) => ({
  type: "DELETE_PROJECT_PAGE_FAILURE",
  payload: error,
});

const updateProjectPageFailure = (error) => ({
  type: "UPDATE_PROJECT_PAGE_FAILURE",
  payload: error,
});

const updateProjectFailure = (error) => ({
  type: "UPDATE_PROJECT_FAILURE",
  payload: error,
});

export {
  getProjectsFailure,
  getProjectSuccess,
  getProjectFailure,
  getProjectsSuccess,
  createProjectFailure,
  deleteProjectPageFailure,
  createProjectPageFailure,
  getProjectPageSuccess,
  getProjectPageFailure,
  updateProjectPageFailure,
  updateProjectFailure,
};
