const initialState = {
  isMenuOpen: false,
  selectedMenuId: null,
  variant: [],
  data: [
    {
      id: 1,
      name: "Заголовок",
      variant: [
        {
          id: 1,
          text: "<p>Test text in the editor</p>",
          image: "tpl_60.png",
          menuId: 1,
          styles: {
            maxWidth: "12",
            paddingTop: "45px",
            paddingBottom: "45px",
            backgroundColor: "#ffffff",
          },
        },
        {
          id: 2,
          text: "",
          image: "tpl_60.png",
          menuId: 1,
          styles: {
            maxWidth: "12",
            paddingTop: "45px",
            paddingBottom: "45px",
            backgroundColor: "#ffffff",
          },
        },
      ],
    },
    {
      id: 2,
      name: "Текстовый блок",
      variant: [
        {
          id: 3,
          text: "",
          image: "",
          menuId: 2,
          styles: {
            maxWidth: "12",
            paddingTop: "45px",
            paddingBottom: "45px",
            backgroundColor: "#ffffff",
          },
        },
      ],
    },
  ],
};

const getVariant = (data, id) => {
  return data.find((item) => item.id === id).variant;
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
        selectedMenuId: action.payload.id,
        variant: getVariant(state.data, action.payload.id),
      };
    case "RESET_MENU":
      return initialState;
    default:
      return state;
  }
};

export default menu;
