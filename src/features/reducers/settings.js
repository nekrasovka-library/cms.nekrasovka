const initialState = {
  isSettingsOpen: false,
  data: [],
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SETTINGS":
      return {
        ...state,
        isSettingsOpen: !state.isSettingsOpen,
      };
    case "SAVE_SETTINGS":
      return {
        ...state,
      };
    case "RESET_SETTINGS":
      return initialState;
    default:
      return state;
  }
};

export default settings;
