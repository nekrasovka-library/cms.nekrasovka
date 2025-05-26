import React from "react";
import { ProjectMainContainer } from "../project.styles.js";
import ProjectMainCard from "./project.main.card.jsx";

const ProjectMain = () => {
  const pages = [
    {
      name: "Blank page",
      pageId: "1",
      projectId: "1",
      position: 1,
    },
    {
      name: "Blank page",
      pageId: "2",
      projectId: "1",
      position: 2,
    },
  ];

  return (
    <ProjectMainContainer>
      {pages.map(({ pageId, name, position }) => (
        <ProjectMainCard
          key={pageId}
          pageId={pageId}
          name={name}
          position={position}
        />
      ))}
    </ProjectMainContainer>
  );
};

export default ProjectMain;
