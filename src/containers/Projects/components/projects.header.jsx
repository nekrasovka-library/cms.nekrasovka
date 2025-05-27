import React, { useState } from "react";
import { ProjectsHeaderContainer } from "../projects.styles.js";
import Icon from "../../../nekrasovka-ui/Icon/icon.jsx";
import ProjectCreate from "./project.create.jsx";
import { useDispatch } from "react-redux";

const ProjectsHeader = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProject = (projectData) => {
    dispatch({ type: "CREATE_PROJECT_REQUEST", payload: projectData });
  };

  return (
    <ProjectsHeaderContainer>
      <div>Мои проекты:</div>
      <div onClick={() => setIsModalOpen(true)}>
        <Icon icon="add" fill="#fa886e" />
        <div>Создать новый проект</div>
      </div>
      <ProjectCreate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </ProjectsHeaderContainer>
  );
};

export default ProjectsHeader;
