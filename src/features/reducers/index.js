import { combineReducers } from "redux";
import menu from "./menu";
import block from "./block";

// Объединяем редьюсеры
const rootReducer = combineReducers({
  menu: menu,
  block: block,
});

export default rootReducer;
