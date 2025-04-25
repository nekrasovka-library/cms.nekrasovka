import { combineReducers } from "redux";
import init from "./init"; // Импортируем редьюсер для HomePage
import menu from "./menu"; // Импортируем редьюсер для HomePage

// Объединяем редьюсеры
const rootReducer = combineReducers({
  home: init,
  menu: menu,
});

export default rootReducer;
