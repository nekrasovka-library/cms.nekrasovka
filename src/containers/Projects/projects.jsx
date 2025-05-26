import React from "react";
import {
  ProjectsCardsContainer,
  ProjectsContainer,
} from "./projects.styles.js";
import ProjectCard from "./components/project.card.jsx";
import ProjectsHeader from "./components/projects.header.jsx";

const Projects = () => {
  return (
    <ProjectsContainer>
      <ProjectsHeader />
      <ProjectsCardsContainer>
        <ProjectCard />
      </ProjectsCardsContainer>
    </ProjectsContainer>
  );
};

export default Projects;
