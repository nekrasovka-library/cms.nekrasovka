import React, { useEffect, useState } from "react";
import {
  HeaderContainer,
  HeaderLeft,
  HeaderLeftBlankPageLink,
  HeaderLeftBlankPageList,
  HeaderLeftHome,
  HeaderRight,
  HeaderRightPreview,
} from "./constructor.header.styles.js";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";
import { Link } from "react-router";
import ConstructorHeaderDropdown from "./components/constructor.header.dropdown.jsx";

const ConstructorHeader = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isPreview } = useSelector((state) => state.preview);
  const { pageData } = useSelector((state) => state.page);
  const { blocks } = useSelector((state) => state.blocks);
  const { projectData } = useSelector((state) => state.project);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  const handleToggleView = () => {
    dispatch({ type: "TOGGLE_PREVIEW" });
  };

  const handleSaveProjectPage = () => {
    const { projectId, pageId } = pageData;

    dispatch({
      type: "UPDATE_PROJECT_PAGE_REQUEST",
      projectId,
      pageId,
      blocks,
    });
    dispatch({ type: "GET_PROJECT_PAGE_REQUEST", pageId });
  };

  useEffect(() => {
    if (isPreview) handleToggleView();
    if (isDropdownOpen) setIsDropdownOpen(false);
  }, [pageData.pageId]);

  useEffect(() => {
    const params = window.location.pathname.split("/");

    if (params[2] && params[3]) setIsProjectOpen(true);
    else setIsProjectOpen(false);
  }, [window.location.pathname]);

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderLeftHome to="/projects">
          <Icon icon="home" />
          <span>Мои проекты</span>
        </HeaderLeftHome>
        {isProjectOpen && (
          <>
            /
            <HeaderLeftBlankPageLink>
              <Icon icon="globus" />
              <Link to={`/projects/${projectData.projectId}`}>
                {projectData.name}
              </Link>
            </HeaderLeftBlankPageLink>
            /
            <HeaderLeftBlankPageList
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              $isDropdownOpen={isDropdownOpen}
            >
              <Icon icon="blankPage" />
              <span>{pageData.name}</span>
              {isDropdownOpen && (
                <ConstructorHeaderDropdown
                  pages={projectData.pages}
                  pageId={pageData.pageId}
                  projectId={projectData.projectId}
                  setIsDropdownOpen={setIsDropdownOpen}
                  mainPage={projectData.mainPage}
                />
              )}
            </HeaderLeftBlankPageList>
          </>
        )}
      </HeaderLeft>
      {isProjectOpen && (
        <HeaderRight>
          <HeaderRightPreview onClick={handleToggleView}>
            {isPreview ? "Редактирование" : "Предпросмотр"}
          </HeaderRightPreview>
          <HeaderRightPreview onClick={handleSaveProjectPage}>
            Сохранить страницу
          </HeaderRightPreview>
        </HeaderRight>
      )}
    </HeaderContainer>
  );
};

export default ConstructorHeader;
