import React from "react";
import { Route, Routes } from "react-router";
import Projects from "./containers/Projects/projects.jsx";
import Page from "./containers/Page/page.jsx";
import Project from "./containers/Project/project.jsx";
import AfishaPage from "./components/AfishaPage/afisha.page";

const Main = () => {
  return (
    <Routes>
      <Route path="projects">
        <Route index element={<Projects />} />
        <Route path=":projectId">
          <Route index element={<Project />} />
          <Route path=":pageId">
            <Route index element={<Page />} />
            <Route path="afisha" element={<AfishaPage />}>
              <Route index element={<AfishaPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Main;
