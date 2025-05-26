import React from "react";
import { useParams } from "react-router";

const Project = () => {
  let { projectId } = useParams();

  return <div>Project {projectId}</div>;
};

export default Project;
