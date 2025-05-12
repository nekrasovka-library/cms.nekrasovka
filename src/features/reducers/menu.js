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
          text: "<div style='padding-bottom: 20px;font-size: 16px;font-weight: 600;letter-spacing: 2.5px;'>BASICS</div><div style='font-size: 36px;font-weight: 600;line-height: 1.23;'>Why typography matters?</div>",
          type: "text",
          image: "tpl_60.png",
          menuId: 1,
          styles: {
            maxWidth: "10",
            paddingTop: "135px",
            paddingBottom: "90px",
            backgroundColor: "#ffffff",
            textAlign: "center",
          },
        },
      ],
    },
    {
      id: 3,
      name: "Изображение",
      variant: [
        {
          id: 3,
          image: "tpl_3.png",
          type: "image",
          text: '<div><img src="imgfish.jpg" alt="" /></div>',
          menuId: 3,
          styles: {
            maxWidth: "12",
            paddingTop: "75px",
            paddingBottom: "75px",
            backgroundColor: "#ffffff",
            textAlign: "center",
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
