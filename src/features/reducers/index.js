import { combineReducers } from "redux";
import menu from "./menu";
import block from "./block";
import settings from "./settings";

// Объединяем редьюсеры
const rootReducer = combineReducers({
  menu: menu,
  block: block,
  settings: settings,
});

export default rootReducer;
