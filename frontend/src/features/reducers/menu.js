const initialState = {
  isMenuOpen: false,
  selectedMenuId: null,
  variants: [],
  variant: {},
  data: [
    {
      id: 1,
      name: "Заголовок",
      variants: [
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
      variants: [
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
      variants: [
        {
          id: 3,
          image: "tpl_3.png",
          type: "image",
          text: "",
          menuId: 3,
          styles: {
            maxWidth: "12",
            paddingTop: "75px",
            paddingBottom: "75px",
            backgroundColor: "#ffffff",
            borderRadius: "0",
            height: "550",
          },
        },
      ],
    },
    {
      id: 4,
      name: "Галерея",
      variants: [
        {
          id: 4,
          image: "tpl_670.png",
          type: "carousel",
          text: [],
          menuId: 4,
          styles: {
            maxWidth: "12",
            paddingTop: "90px",
            paddingBottom: "90px",
            backgroundColor: "#ffffff",
            borderRadius: "0",
            tracks: 4,
            height: "550",
          },
        },
      ],
    },
    {
      id: 5,
      name: "Разделитель",
      variants: [
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
      variants: [
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
            tracks: 2,
          },
        },
      ],
    },
    {
      id: 7,
      name: "Кнопка",
      variants: [
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
    {
      id: 8,
      name: "Шапка",
      variants: [
        {
          id: 8,
          image: "header_nekrasovka.png",
          type: "header",
          text: `<div style="display: flex; justify-content: space-between;">
<div>
<a href="//nekrasovka.ru/" target="_blank"><img src="/nekrasovka.png" alt="" height="50"></a>
<a href="//mos.ru/kultura/" target="_blank"><img src="/mos.png" alt="" height="50" style="margin-left: 35px;"></a>
</div>
<div style="display: flex; align-items: center;">
<a href="//vk.com/nekrasovkalibrary" target="_blank">
<img src="/vk.png" alt="" height="30">
</a>
<a href="//t.me/nekrasovkalibrary" target="_blank">
<img src="/telegram.png" alt="" height="30" style="margin-left: 10px;">
</a>
</div>
</div>`,
          menuId: 8,
          styles: {
            paddingTop: "25px",
            paddingBottom: "25px",
            maxWidth: "12",
            backgroundColor: "#EDEEE9",
          },
        },
      ],
    },
    {
      id: 9,
      name: "Подвал",
      variants: [
        {
          id: 9,
          image: "footer_nekrasovka.png",
          type: "footer",
          text: `<div style="display: flex; justify-content: space-between;">
<div>
<a href="//mos.ru/kultura/" target="_blank">
<img src="/nekrasovka.png" alt="" height="50">
</a>
<a href="//nekrasovka.ru/" target="_blank">
<img src="/mos.png" alt="" height="50" style="margin-left: 35px;">
</a>
</div>
<div style="display: flex; column-gap: 50px; font-size: 14px; color: #346178;">
<div style="max-width: 250px;">Сведения об организации, осуществляющей образовательную деятельность</div>
<div>Оценка качества услуг</div>
<button style="display: flex; align-items: center; justify-content: center; column-gap: 10px; padding: 0 15px; height: 40px; background: #5D4A96; border-radius: 5px; color: #EDEEE9; font-size: 14px;">
<img src="/question.png" alt="" height="20"><span>Задать вопрос</span>
</button>
</div>
</div>`,
          menuId: 9,
          styles: {
            paddingTop: "45px",
            paddingBottom: "45px",
            maxWidth: "12",
            backgroundColor: "#EDEEE9",
          },
        },
      ],
    },
  ],
};

const findByMenuId = (data, id) => {
  return data.find((item) => item.id === id).variants;
};

const findByVariantId = (data, variantId) => {
  for (const obj of data) {
    const foundVariant = obj.variants.find((v) => v.id === variantId);

    if (foundVariant) {
      return foundVariant; // Возвращаем найденный элемент
    }
  }

  return null; // Возвращаем null, если элемент не найден
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
        variants: findByMenuId(state.data, action.payload.id),
      };
    case "GET_VARIANT":
      return {
        ...state,
        variant: findByVariantId(state.data, action.payload.id),
      };
    case "RESET_MENU":
      return initialState;
    default:
      return state;
  }
};

export default menu;
