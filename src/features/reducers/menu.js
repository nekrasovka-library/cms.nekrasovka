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
          text: "imgfish.jpg",
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
    {
      id: 5,
      name: "Разделитель",
      variant: [
        {
          id: 5,
          image: "tpl_126.png",
          type: "divider",
          text: "",
          menuId: 5,
          styles: {
            maxWidth: "2",
            paddingTop: "60px",
            paddingBottom: "60px",
            backgroundColor: "#ffffff",
            color: "#000",
            opacity: "0.2",
          },
        },
      ],
    },
    {
      id: 6,
      name: "Колонки",
      variant: [
        {
          id: 6,
          image: "tpl_218.png",
          type: "text",
          text: '<div style="font-size: 20px;line-height: 1.55;">Book design is the art of incorporating the content, style, format, design, and sequence of the various components of a book into a coherent whole. In the words of Jan Tschichold, book designer, "methods and rules upon which it is impossible to improve, have been developed over centuries. To produce perfect books, these rules have to be brought back to life and applied.</div><div style="font-size: 20px;line-height: 1.55;">Visual aids are often used to help audiences of informative and persuasive speeches understand the topic being presented. Visual aids can play a large role in how the audience understands and takes in information that is presented.</div>',
          menuId: 6,
          styles: {
            maxWidth: "12",
            paddingTop: "45px",
            paddingBottom: "45px",
            backgroundColor: "#ffffff",
            gap: "20",
            tracks: "2",
          },
        },
      ],
    },
    {
      id: 7,
      name: "Кнопка",
      variant: [
        {
          id: 7,
          image: "tpl_191.png",
          type: "button",
          text: '<a href="//" target=""><span>Let\'s go!</span></a>',
          menuId: 7,
          styles: {
            maxWidth: "12",
            paddingTop: "90px",
            paddingBottom: "90px",
            backgroundColor: "#ffffff",
            textAlign: "center",
            color: "#000",
            borderRadius: "0",
            height: "60",
            border: {
              color: "#000",
              width: "1",
              style: "solid",
            },
            elementBackgroundColor: "#ffffff",
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
