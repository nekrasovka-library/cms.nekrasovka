import React, { useEffect, useRef, useState } from "react";
import {
  ProjectMainCardContainer,
  ProjectMainCardPageName,
} from "../project.styles.js";
import Icon from "../../../nekrasovka-ui/Icon/icon.jsx";
import { Link } from "react-router";

const ProjectMainCard = ({
  pageId,
  projectId,
  name = "",
  isPageMain,
  url,
  handlePageNameSave,
  handleDeleteProjectPage,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [pageName, setPageName] = useState(name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      // Небольшая задержка может помочь, если анимация влияет на фокус
      setTimeout(() => {
        inputRef.current.focus();
      }, 10);
    }
  }, [isEdit]);

  return (
    <ProjectMainCardContainer>
      <ProjectMainCardPageName>
        {isPageMain && <Icon icon="home" />}
        {isEdit ? (
          <div>
            <input
              ref={inputRef}
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
            />
            <Icon
              icon="save"
              type="button"
              onClick={() => {
                handlePageNameSave(projectId, pageId, pageName);
                setIsEdit(false);
              }}
            />
            <Icon
              icon="closeMenu"
              type="button"
              onClick={() => {
                setPageName(name);
                setIsEdit(false);
              }}
            />
          </div>
        ) : (
          <div>
            <Link to={`${pageId}`}>
              <span>{pageName}</span>
            </Link>
            <Icon icon="edit" type="button" onClick={() => setIsEdit(true)} />
          </div>
        )}
      </ProjectMainCardPageName>
      <div>{url}</div>
      <div>
        <div onClick={() => handleDeleteProjectPage(projectId, pageId)}>
          <Icon icon="trash" />
          <span>УДАЛИТЬ</span>
        </div>
      </div>
    </ProjectMainCardContainer>
  );
};

export default ProjectMainCard;
