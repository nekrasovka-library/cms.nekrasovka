import React from "react";
import { ProjectHeaderContainer } from "../project.styles.js";
import { Link } from "react-router";
import Icon from "../../../nekrasovka-ui/Icon/icon.jsx";
import { useDispatch } from "react-redux";

const ProjectHeader = ({ href, name, projectId }) => {
  const dispatch = useDispatch();

  const handleCreateProjectPage = () => {
    dispatch({ type: "CREATE_PROJECT_PAGE_REQUEST", projectId });
  };

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
        <div>
          <span>{name}</span>
        </div>
        <div>
          <div>
            <Icon icon="settings" fill="#fa886e" />
            <Link to={`/settings/${projectId}`}>Настройки проекта</Link>
          </div>
          <div onClick={handleCreateProjectPage}>
            <Icon icon="add" fill="#fa886e" />
            <div>Создать новую страницу</div>
          </div>
        </div>
      </div>
    </ProjectHeaderContainer>
  );
};

export default ProjectHeader;
