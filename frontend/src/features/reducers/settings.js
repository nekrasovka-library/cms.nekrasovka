const initialState = {
  isSettingsOpen: false,
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
