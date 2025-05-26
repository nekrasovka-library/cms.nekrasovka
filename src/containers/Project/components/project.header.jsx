import React from "react";
import { ProjectHeaderContainer } from "../project.styles.js";
import { Link, useParams } from "react-router";

const ProjectHeader = ({ href }) => {
  let { projectId } = useParams();

  return (
    <ProjectHeaderContainer $isHref={!!href}>
      <div>
        <span>Адрес сайта:</span>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {href}
          </a>
        ) : (
          <Link to={`/settings/${projectId}`}>
            указать в настройках проекта
          </Link>
        )}
      </div>
      <div>
        <span>Project {projectId}</span>
        <Link to={`/settings/${projectId}`}>НАСТРОЙКИ ПРОЕКТА</Link>
      </div>
    </ProjectHeaderContainer>
  );
};

export default ProjectHeader;
