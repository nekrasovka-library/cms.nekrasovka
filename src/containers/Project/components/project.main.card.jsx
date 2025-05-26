import React from "react";
import { ProjectMainCardContainer } from "../project.styles.js";
import Icon from "../../../nekrasovka-ui/Icon/icon.jsx";
import { Link } from "react-router";

const ProjectMainCard = ({ pageId, name, position }) => {
  return (
    <ProjectMainCardContainer>
      <Link to={pageId}>
        {position === 1 && <Icon icon="home" />}
        <span>{name}</span>
      </Link>
      <div>
        <div>
          <Icon icon="trash" />
          <span>УДАЛИТЬ</span>
        </div>
      </div>
    </ProjectMainCardContainer>
  );
};

export default ProjectMainCard;
