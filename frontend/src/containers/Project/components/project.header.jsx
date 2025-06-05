import React from "react";
import { ProjectHeaderContainer } from "../project.styles.js";
import Icon from "../../../nekrasovka-ui/Icon/icon.jsx";
import { Button } from "../../Projects/projects.styles.js";

const ProjectHeader = ({
  href,
  name,
  setIsProjectSettingsOpen,
  isProjectSettingsOpen,
  handleSaveSettings,
  handleCloseSettings,
  handleCreateProjectPage,
}) => {
  return (
    <ProjectHeaderContainer
      $isHref={!!href}
      $isProjectSettingsOpen={isProjectSettingsOpen}
    >
      <div>
        <div>
          <span>Адрес сайта:</span>
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {href}
            </a>
          ) : (
            <span>укажите в настройках проекта</span>
          )}
        </div>
      </div>
      <div>
        <div>
          <h3>{name}</h3>
          {isProjectSettingsOpen ? (
            <div>
              <Icon icon="arrowRightLong" />
              <h3>Настройки проекта</h3>
            </div>
          ) : (
            ""
          )}
        </div>
        {isProjectSettingsOpen ? (
          <div>
            <Button
              type="button"
              className="secondary"
              onClick={handleCloseSettings}
            >
              Закрыть
            </Button>
            <Button
              type="button"
              className="primary"
              onClick={handleSaveSettings}
            >
              Сохранить
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <Icon icon="settings" fill="#fa886e" />
              <span onClick={() => setIsProjectSettingsOpen(true)}>
                Настройки проекта
              </span>
            </div>
            <div onClick={handleCreateProjectPage}>
              <Icon icon="add" fill="#fa886e" />
              <div>Создать новую страницу</div>
            </div>
          </div>
        )}
      </div>
    </ProjectHeaderContainer>
  );
};

export default ProjectHeader;
