import React from "react";
import {
  ProjectMainContainer,
  ProjectMainContainerHeader,
} from "../project.styles.js";
import ProjectMainCard from "./project.main.card.jsx";

const ProjectMain = ({ pages }) => {
  return (
    <ProjectMainContainer>
      <ProjectMainContainerHeader>Страницы проекта:</ProjectMainContainerHeader>
      {pages.map(({ pageId, projectId, name, position, url }) => (
        <ProjectMainCard
          key={pageId}
          pageId={pageId}
          projectId={projectId}
          name={name}
          position={position}
          url={url}
        />
      ))}
    </ProjectMainContainer>
  );
};

export default ProjectMain;
