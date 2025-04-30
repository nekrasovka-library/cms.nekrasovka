import { combineReducers } from "redux";
import menu from "./menu";
import blocks from "./blocks";
import settings from "./settings";

// Объединяем редьюсеры
const rootReducer = combineReducers({
  menu: menu,
  blocks: blocks,
  settings: settings,
});

export default rootReducer;
