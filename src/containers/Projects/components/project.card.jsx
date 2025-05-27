import React from "react";
import { ProjectCardContainer } from "../projects.styles.js";
import { Link } from "react-router";

const ProjectCard = ({ projectId = 1, href = "", name = "" }) => {
  return (
    <ProjectCardContainer>
      <div>
        <Link to={`${projectId}`}>{name}</Link>
      </div>
      <div>
        <div>
          <Link to={`/settings/${projectId}`}>НАСТРОЙКИ ПРОЕКТА</Link>
        </div>
        <div>{href && <a href={href}>ссылка</a>}</div>
      </div>
    </ProjectCardContainer>
  );
};

export default ProjectCard;
