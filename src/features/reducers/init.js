const initialState = {
  data: [],
  loading: false,
  error: null,
};

const init = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_HOME_DATA":
      return { ...state, loading: true };
    case "FETCH_HOME_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_HOME_ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default init;
