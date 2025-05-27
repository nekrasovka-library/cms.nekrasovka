import React from "react";
import { ProjectMainContainer } from "../project.styles.js";
import ProjectMainCard from "./project.main.card.jsx";

const ProjectMain = ({ pages }) => {
  return (
    <ProjectMainContainer>
      {pages.map(({ pageId, projectId, name, position }) => (
        <ProjectMainCard
          key={pageId}
          pageId={pageId}
          projectId={projectId}
          name={name}
          position={position}
        />
      ))}
    </ProjectMainContainer>
  );
};

export default ProjectMain;
