const initialState = {
  isSettingsOpen: false,
  defaultStyles: {
    maxWidth: "1160px",
    paddingTop: "45px",
    paddingBottom: "45px",
  },
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SETTINGS":
      return {
        ...state,
        isSettingsOpen: !state.isSettingsOpen,
      };
    case "RESET_SETTINGS":
      return initialState;
    default:
      return state;
  }
};

export default settings;
