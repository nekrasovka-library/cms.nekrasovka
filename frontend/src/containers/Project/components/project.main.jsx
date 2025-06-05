import React from "react";
import {
  ProjectMainContainer,
  ProjectMainContainerHeader,
} from "../project.styles.js";
import ProjectMainCard from "./project.main.card.jsx";
import { useDispatch } from "react-redux";

const ProjectMain = ({ pages, mainPage }) => {
  const dispatch = useDispatch();

  const handlePageNameSave = (projectId, pageId, name) => {
    dispatch({ type: "UPDATE_PROJECT_PAGE_REQUEST", projectId, pageId, name });
    dispatch({ type: "GET_PROJECT_REQUEST", projectId });
  };

  const handleDeleteProjectPage = (projectId, pageId) => {
    dispatch({ type: "DELETE_PROJECT_PAGE_REQUEST", projectId, pageId });
    dispatch({ type: "GET_PROJECT_REQUEST", projectId });
  };

  return (
    <ProjectMainContainer>
      <ProjectMainContainerHeader>Страницы проекта:</ProjectMainContainerHeader>
      {pages.map(({ pageId, projectId, name, url }) => (
        <ProjectMainCard
          key={pageId}
          pageId={pageId}
          projectId={projectId}
          isPageMain={pageId === mainPage}
          name={name}
          url={url}
          handlePageNameSave={handlePageNameSave}
          handleDeleteProjectPage={handleDeleteProjectPage}
        />
      ))}
    </ProjectMainContainer>
  );
};

export default ProjectMain;
