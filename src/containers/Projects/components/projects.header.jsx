import React from "react";
import { ProjectsHeaderContainer } from "../projects.styles.js";
import Icon from "../../../nekrasovka-ui/Icon/icon.jsx";

const ProjectsHeader = () => {
  return (
    <ProjectsHeaderContainer>
      <div>Мои проекты:</div>
      <div>
        <Icon icon="add" fill="#fa886e" />
        <div>Создать новый проект</div>
      </div>
    </ProjectsHeaderContainer>
  );
};

export default ProjectsHeader;
