import { combineReducers } from "redux";
import menu from "./menu";
import blocks from "./blocks";
import settings from "./settings";
import preview from "./preview";
import editor from "./editor.js";

// Объединяем редьюсеры
const rootReducer = combineReducers({
  menu: menu,
  blocks: blocks,
  settings: settings,
  preview: preview,
  editor: editor,
});

export default rootReducer;
