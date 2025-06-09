const initialState = {
  fontsData: [],
  fontsError: null,
};

const preview = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FONTS_SUCCESS":
      return {
        ...state,
        fontsData: action.payload.data,
        fontsError: null,
      };
    case "GET_FONTS_FAILURE":
      return {
        ...state,
        fontsError: action.payload,
      };
    case "RESET_FONTS":
      return initialState;
    default:
      return state;
  }
};

export default preview;
