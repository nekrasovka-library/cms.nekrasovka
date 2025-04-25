const initialState = {
  isMenuOpen: false,
  selectedMenu: null,
};

const menu = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    case "SELECT_MENU":
      return {
        ...state,
        selectedMenu: action.payload,
      };
    case "RESET_MENU":
      return initialState;
    default:
      return state;
  }
};

export default menu;
