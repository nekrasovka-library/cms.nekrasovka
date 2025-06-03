import React, { useEffect } from "react";
import {
  ProjectsCardsContainer,
  ProjectsContainer,
} from "./projects.styles.js";
import ProjectCard from "./components/project.card.jsx";
import ProjectsHeader from "./components/projects.header.jsx";
import { useDispatch, useSelector } from "react-redux";
import Transition from "../../components/Transition/transition.jsx";
import { AnimatePresence } from "framer-motion";

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
      <AnimatePresence mode="wait">
        <Transition key={isProjectsLoaded}>
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
        </Transition>
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default Projects;
