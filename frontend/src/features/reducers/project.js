const initialState = {
  projectData: {},
  projectError: null,
  isProjectLoaded: false,
};

const project = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECT_SUCCESS":
      return {
        ...state,
        projectData: action.payload.data,
        isProjectLoaded: true,
      };
    case "GET_PROJECT_FAILURE":
      return {
        ...state,
        projectError: action.payload,
      };
    case "CREATE_PROJECT_FAILURE":
      return {
        ...state,
        projectError: action.payload,
      };
    case "UPDATE_PROJECT_FAILURE":
      return {
        ...state,
        projectError: action.payload,
      };
    case "DELETE_PROJECT_PAGE_FAILURE":
      return {
        ...state,
        projectError: action.payload,
      };
    case "CREATE_PROJECT_PAGE_FAILURE":
      return {
        ...state,
        projectError: action.payload,
      };
    case "RESET_PROJECT":
      return initialState;
    default:
      return state;
  }
};

export default project;
