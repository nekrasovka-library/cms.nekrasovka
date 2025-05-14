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
      id: 2,
      name: "Текстовый блок",
      variant: [
        {
          id: 2,
          text: '<div style="font-size: 20px;line-height: 1.55;">Book design is the art of incorporating the content, style, format, design, and sequence of the various components of a book into a coherent whole. In the words of Jan Tschichold, "Methods and rules that cannot be improved upon have been developed over centuries. To produce perfect books, these rules must be revived and applied." The front matter, or preliminaries, is the first section of a book and typically has the fewest pages. While all pages are counted, page numbers are generally not printed, whether the pages are blank or contain content.</div>',
          type: "text",
          image: "tpl_106.png",
          menuId: 2,
          styles: {
            maxWidth: "8",
            paddingTop: "60px",
            paddingBottom: "60px",
            backgroundColor: "#ffffff",
            textAlign: "left",
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
            borderRadius: "",
          },
        },
      ],
    },
    {
      id: 4,
      name: "Галерея",
      variant: [
        {
          id: 4,
          image: "tpl_670.png",
          type: "carousel",
          text: [
            "jorgenhaland101813.jpg",
            "jorgenhaland101813.jpg",
            "jorgenhaland101813.jpg",
          ],
          menuId: 4,
          styles: {
            maxWidth: "12",
            paddingTop: "90px",
            paddingBottom: "90px",
            backgroundColor: "#ffffff",
            borderRadius: "",
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
