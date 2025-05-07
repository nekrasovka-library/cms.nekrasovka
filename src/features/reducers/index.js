import { combineReducers } from "redux";
import menu from "./menu";
import blocks from "./blocks";
import settings from "./settings";
import preview from "./preview";

// Объединяем редьюсеры
const rootReducer = combineReducers({
  menu: menu,
  blocks: blocks,
  settings: settings,
  preview: preview,
});

export default rootReducer;
