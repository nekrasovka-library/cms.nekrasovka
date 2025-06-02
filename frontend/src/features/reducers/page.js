const initialState = {
  pageData: {},
  pageError: null,
  isPageLoaded: false,
};

const page = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECT_PAGE_SUCCESS":
      return {
        ...state,
        pageData: action.payload.data,
        isPageLoaded: true,
      };
    case "GET_PROJECT_PAGE_FAILURE":
      return {
        ...state,
        pageError: action.payload,
      };
    case "UPDATE_PROJECT_PAGE_FAILURE":
      return {
        ...state,
        pageError: action.payload,
      };
    case "RESET_PROJECT_PAGE":
      return initialState;
    default:
      return state;
  }
};

export default page;
