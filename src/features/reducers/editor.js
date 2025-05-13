const initialState = {
  editorFocused: null,
};

const preview = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_EDITOR":
      return {
        ...state,
        editorFocused: action.payload,
      };
    case "RESET_EDITOR":
      return initialState;
    default:
      return state;
  }
};

export default preview;
