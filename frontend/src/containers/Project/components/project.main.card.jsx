import React from "react";
import { ProjectMainCardContainer } from "../project.styles.js";
import Icon from "../../../nekrasovka-ui/Icon/icon.jsx";
import { Link } from "react-router";
import { useDispatch } from "react-redux";

const ProjectMainCard = ({ pageId, projectId, name, position, url }) => {
  const dispatch = useDispatch();

  const handleDeleteProjectPage = () => {
    dispatch({ type: "DELETE_PROJECT_PAGE_REQUEST", projectId, pageId });
  };

  return (
    <ProjectMainCardContainer>
      <Link to={`${pageId}`}>
        {position === 1 && <Icon icon="home" />}
        <span>{name}</span>
      </Link>
      <div>{url}</div>
      <div>
        <div onClick={handleDeleteProjectPage}>
          <Icon icon="trash" />
          <span>УДАЛИТЬ</span>
        </div>
      </div>
    </ProjectMainCardContainer>
  );
};

export default ProjectMainCard;
