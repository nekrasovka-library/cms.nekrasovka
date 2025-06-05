import React, { useState } from "react";
import {
  ProjectSettingsActions,
  ProjectSettingsContainer,
  ProjectSettingsFonts,
  ProjectSettingsMainPage,
  ProjectSettingsProjectMain,
  ProjectSettingsTitles,
  ProjectSettingsTitlesTitle,
} from "../project.styles.js";
import {
  PaddingSelect,
  RadiusInput,
  SettingsLabel,
} from "../../Settings/settings.styles";
import { useSelector } from "react-redux";

const ProjectSettings = ({ handleSettingsChange, projectSettings }) => {
  const [activeTitle, setActiveTitle] = useState(1);
  const { projectData } = useSelector((state) => state.project);

  const settingsTitles = [
    { id: 1, title: "Главное" },
    { id: 2, title: "Шрифты и цвета" },
    { id: 3, title: "Главная страница" },
  ];

  const projectFonts = [
    {
      id: 1,
      label: "Roboto",
    },
    {
      id: 2,
      label: "Rubik",
    },
  ];

  return (
    <ProjectSettingsContainer>
      <ProjectSettingsTitles>
        {settingsTitles.map((title) => {
          return (
            <ProjectSettingsTitlesTitle
              key={title.id}
              $isTitleActive={title.id === activeTitle}
              onClick={() => setActiveTitle(title.id)}
            >
              {title.title}
            </ProjectSettingsTitlesTitle>
          );
        })}
      </ProjectSettingsTitles>
      <ProjectSettingsActions>
        {activeTitle === 1 && (
          <ProjectSettingsProjectMain>
            <div>
              <SettingsLabel>Название проекта</SettingsLabel>
              <RadiusInput
                type="text"
                name="name"
                value={projectSettings?.name}
                onChange={handleSettingsChange}
              />
            </div>
          </ProjectSettingsProjectMain>
        )}
        {activeTitle === 2 && (
          <ProjectSettingsFonts>
            <div>
              <SettingsLabel>Шрифт проекта</SettingsLabel>
              <PaddingSelect
                name="fonts"
                onChange={handleSettingsChange}
                value={projectSettings?.fontFamily}
              >
                {projectFonts.map((font) => (
                  <option key={font.id} value={font.label}>
                    {font.label}
                  </option>
                ))}
              </PaddingSelect>
            </div>
            <div>
              <SettingsLabel>Загрузить шрифт</SettingsLabel>
            </div>
          </ProjectSettingsFonts>
        )}
        {activeTitle === 3 && (
          <ProjectSettingsMainPage>
            <SettingsLabel>Главная страница</SettingsLabel>
            <PaddingSelect
              name="mainPage"
              onChange={handleSettingsChange}
              value={projectSettings?.mainPage}
            >
              {projectData.pages.map((page) => (
                <option key={page.pageId} value={page.pageId}>
                  {page.name}
                </option>
              ))}
            </PaddingSelect>
            <div>
              Выберите, какая страница будет главной для вашего сайта
              (открывается по умолчанию при заходе на сайт).
            </div>
          </ProjectSettingsMainPage>
        )}
      </ProjectSettingsActions>
    </ProjectSettingsContainer>
  );
};

export default ProjectSettings;
