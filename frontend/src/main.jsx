import React from "react";
import { Route, Routes } from "react-router";
import Projects from "./containers/Projects/projects.jsx";
import Page from "./containers/Page/page.jsx";
import Project from "./containers/Project/project.jsx";

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
    </Routes>
  );
};

export default Main;
