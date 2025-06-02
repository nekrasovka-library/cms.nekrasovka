import React, { useEffect } from "react";
import {
  ProjectsCardsContainer,
  ProjectsContainer,
} from "./projects.styles.js";
import ProjectCard from "./components/project.card.jsx";
import ProjectsHeader from "./components/projects.header.jsx";
import { useDispatch, useSelector } from "react-redux";

const Projects = () => {
  const dispatch = useDispatch();
  const { projectsData, isProjectsLoaded } = useSelector(
    (state) => state.projects,
  );

  useEffect(() => {
    dispatch({ type: "GET_PROJECTS_REQUEST" });
  }, [dispatch]);

  return (
    <ProjectsContainer>
      <ProjectsHeader />
      {isProjectsLoaded && (
        <ProjectsCardsContainer>
          {projectsData.map(({ projectId, href, name }) => (
            <ProjectCard
              key={projectId}
              projectId={projectId}
              href={href}
              name={name}
            />
          ))}
        </ProjectsCardsContainer>
      )}
    </ProjectsContainer>
  );
};

export default Projects;
