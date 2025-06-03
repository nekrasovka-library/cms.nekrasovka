import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

// Компоненты
import ProjectHeader from "./components/project.header.jsx";
import ProjectMain from "./components/project.main.jsx";
import ProjectSettings from "./components/project.settings.jsx";
import { ProjectContainer } from "./project.styles.js";
import { AnimatePresence } from "framer-motion";
import Transition from "../../components/Transition/transition.jsx";

// Константы Redux actions
const GET_PROJECT_REQUEST = "GET_PROJECT_REQUEST";

/**
 * Хук для загрузки данных проекта
 * @param {string} projectId - ID проекта для загрузки
 * @returns {Object} Объект с данными проекта и статусом загрузки
 */
const useProjectData = (projectId) => {
  const dispatch = useDispatch();
  const { projectData, isProjectLoaded } = useSelector(
    (state) => state.project,
  );

  useEffect(() => {
    dispatch({
      type: GET_PROJECT_REQUEST,
      projectId,
    });
  }, [projectId, dispatch, isProjectLoaded]);

  return { projectData, isProjectLoaded };
};

/**
 * Компонент страницы проекта
 */
const Project = () => {
  const { projectId } = useParams();
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);
  const { projectData, isProjectLoaded } = useProjectData(projectId);

  if (!isProjectLoaded) return null;

  return (
    <ProjectContainer>
      <ProjectHeader
        href={projectData.href}
        name={projectData.name}
        projectId={projectData.projectId}
        setIsProjectSettingsOpen={setIsProjectSettingsOpen}
        isProjectSettingsOpen={isProjectSettingsOpen}
      />
      <AnimatePresence mode="wait">
        <Transition key={isProjectSettingsOpen}>
          {isProjectSettingsOpen ? (
            <ProjectSettings />
          ) : (
            <ProjectMain pages={projectData.pages} />
          )}
        </Transition>
      </AnimatePresence>
    </ProjectContainer>
  );
};

export default Project;
