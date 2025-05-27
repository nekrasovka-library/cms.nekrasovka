import React from "react";
import { Route, Routes } from "react-router";
import Projects from "../Projects/projects.jsx";
import Page from "../Page/page.jsx";
import Project from "../Project/project.jsx";
import ProjectSettings from "../ProjectSettings/project.settings.jsx";

const Main = () => {
  return (
    <Routes>
      <Route path="projects">
        <Route index element={<Projects />} />
        <Route path=":projectId">
          <Route index element={<Project />} />
          <Route path=":pageId" element={<Page />} />
        </Route>
      </Route>
      <Route path="settings">
        <Route path=":projectId" element={<ProjectSettings />} />
      </Route>
    </Routes>
  );
};

export default Main;
