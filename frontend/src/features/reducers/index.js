import { combineReducers } from "redux";
import menu from "./menu.js";
import blocks from "./blocks.js";
import settings from "./settings.js";
import preview from "./preview.js";
import editor from "./editor.js";
import projects from "./projects.js";
import project from "./project.js";
import page from "./page.js";

const rootReducer = combineReducers({
  menu: menu,
  blocks: blocks,
  settings: settings,
  preview: preview,
  editor: editor,
  projects: projects,
  project: project,
  page: page,
});

export default rootReducer;
