import React, { useEffect, useRef, useState } from "react";
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

const Project = () => {
  const { projectId } = useParams();
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);
  const dispatch = useDispatch();
  const prevProjectIdRef = useRef(null);
  const { projectData, isProjectLoaded } = useSelector(
    (state) => state.project,
  );

  const [projectSettings, setProjectSettings] = useState(null);

  const handleSettingsChange = ({ target: { name, value } }) => {
    setProjectSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = () => {
    dispatch({
      type: "UPDATE_PROJECT_REQUEST",
      ...projectSettings,
      projectId: projectData.projectId,
    });
  };

  const handleCreateProjectPage = () => {
    dispatch({
      type: "CREATE_PROJECT_PAGE_REQUEST",
      projectId: projectData.projectId,
    });
  };

  const handleCloseSettings = () => {
    setIsProjectSettingsOpen(false);
  };

  useEffect(() => {
    if (prevProjectIdRef.current !== projectId) {
      dispatch({ type: "RESET_PROJECT" });
      dispatch({ type: GET_PROJECT_REQUEST, projectId });
      prevProjectIdRef.current = projectId;
    }
  }, [projectId, dispatch]);

  useEffect(() => {
    if (isProjectLoaded) {
      setProjectSettings({
        mainPage: projectData.mainPage,
        name: projectData.name,
        href: projectData.href,
        fontFamily: projectData.fontFamily,
      });
    }
  }, [isProjectLoaded]);

  if (!isProjectLoaded) return null;

  return (
    <ProjectContainer>
      <ProjectHeader
        href={projectData.href}
        name={projectData.name}
        setIsProjectSettingsOpen={setIsProjectSettingsOpen}
        isProjectSettingsOpen={isProjectSettingsOpen}
        handleSaveSettings={handleSaveSettings}
        handleCloseSettings={handleCloseSettings}
        handleCreateProjectPage={handleCreateProjectPage}
      />
      <AnimatePresence mode="wait">
        <Transition key={isProjectSettingsOpen}>
          {isProjectSettingsOpen ? (
            <ProjectSettings
              handleSettingsChange={handleSettingsChange}
              projectSettings={projectSettings}
            />
          ) : (
            <ProjectMain
              pages={projectData.pages}
              mainPage={projectData.mainPage}
            />
          )}
        </Transition>
      </AnimatePresence>
    </ProjectContainer>
  );
};

export default Project;
