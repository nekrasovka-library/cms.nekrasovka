const initialState = {
  isPreview: false,
};

const preview = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_PREVIEW":
      return {
        ...state,
        isPreview: !state.isPreview,
      };
    case "RESET_PREVIEW":
      return initialState;
    default:
      return state;
  }
};

export default preview;
