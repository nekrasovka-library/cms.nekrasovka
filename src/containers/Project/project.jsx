import React from "react";
import { ProjectContainer } from "./project.styles.js";
import ProjectsHeader from "../Project/components/project.header.jsx";
import ProjectMain from "./components/project.main.jsx";

const Project = ({ href = "" }) => {
  return (
    <ProjectContainer>
      <ProjectsHeader href={href} />
      <ProjectMain />
    </ProjectContainer>
  );
};

export default Project;
