import React from "react";
import { Route, Routes } from "react-router";
import Projects from "../Projects/projects.jsx";
import Page from "../Page/page.jsx";
import Project from "../Project/project.jsx";

const Main = () => {
  return (
    <Routes>
      <Route path="projects" element={<Projects />}>
        <Route path=":projectid" element={<Project />}>
          <Route path=":pageid" element={<Page />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Main;
