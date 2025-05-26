import React from "react";
import { ProjectMainContainer } from "../project.styles.js";
import { Link } from "react-router";
import Icon from "../../../nekrasovka-ui/Icon/icon.jsx";

const ProjectMain = () => {
  const pages = [
    {
      name: "Blank page",
      pageId: "1",
      projectId: "1",
      position: 1,
    },
    {
      name: "Blank page",
      pageId: "2",
      projectId: "1",
      position: 2,
    },
  ];

  return (
    <ProjectMainContainer>
      {pages.map((page) => (
        <div key={page.pageId}>
          <Link to={page.pageId}>
            {page.position === 1 && <Icon icon="home" />}
            <span>{page.name}</span>
          </Link>
          <div>
            <div>
              <Icon icon="trash" />
              <span>УДАЛИТЬ</span>
            </div>
          </div>
        </div>
      ))}
    </ProjectMainContainer>
  );
};

export default ProjectMain;
