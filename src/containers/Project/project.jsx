import React, { useEffect } from "react";
import { ProjectContainer } from "./project.styles.js";
import ProjectHeader from "../Project/components/project.header.jsx";
import ProjectMain from "./components/project.main.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const Project = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { projectData, isProjectLoaded } = useSelector(
    (state) => state.project,
  );

  useEffect(() => {
    dispatch({ type: "RESET_PROJECT" });
    dispatch({
      type: "GET_PROJECT_REQUEST",
      projectId,
    });
  }, [projectId, dispatch]);

  return (
    isProjectLoaded && (
      <ProjectContainer>
        <ProjectHeader
          href={projectData.href}
          name={projectData.name}
          projectId={projectData.projectId}
        />
        <ProjectMain pages={projectData.pages} />
      </ProjectContainer>
    )
  );
};

export default Project;
