const initialState = {
  projectsData: [],
  projectsError: null,
  isProjectsLoaded: false,
};

const projects = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECTS_SUCCESS":
      return {
        ...state,
        projectsData: action.payload.data,
        isProjectsLoaded: true,
      };
    case "GET_PROJECT_FAILURE":
      return {
        ...state,
        projectError: action.payload,
      };
    case "RESET_PROJECTS":
      return initialState;
    default:
      return state;
  }
};

export default projects;
