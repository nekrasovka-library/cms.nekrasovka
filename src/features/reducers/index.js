import { combineReducers } from "redux";
import menu from "./menu";
import blocks from "./blocks";
import settings from "./settings";
import preview from "./preview";
import editor from "./editor.js";
import projects from "./projects";
import project from "./project";

const rootReducer = combineReducers({
  menu: menu,
  blocks: blocks,
  settings: settings,
  preview: preview,
  editor: editor,
  projects: projects,
  project: project,
});

export default rootReducer;
