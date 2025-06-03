import React, { useEffect } from "react";
import {
  HeaderContainer,
  HeaderLeft,
  HeaderLeftBlankPageLink,
  HeaderLeftBlankPageList,
  HeaderLeftHome,
  HeaderRight,
  HeaderRightPreview,
} from "./header.styles.js";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";
import { Link } from "react-router";
import HeaderDropdown from "./components/header.dropdown.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { isPreview } = useSelector((state) => state.preview);
  const { pageData, isPageLoaded } = useSelector((state) => state.page);
  const { blocks } = useSelector((state) => state.blocks);
  const { projectData } = useSelector((state) => state.project);

  const handleToggleView = () => {
    dispatch({ type: "TOGGLE_PREVIEW" });
  };

  const handleSaveProjectPage = () => {
    const { html, projectId, pageId } = pageData;

    dispatch({
      type: "UPDATE_PROJECT_PAGE_REQUEST",
      projectId,
      pageId,
      blocks,
      html,
    });
  };

  useEffect(() => {
    if (isPreview) handleToggleView();
    if (isDropdownOpen) setIsDropdownOpen(false);
  }, [pageData.pageId]);

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderLeftHome to="/projects">
          <Icon icon="home" />
          <span>Мои проекты</span>
        </HeaderLeftHome>
        {isPageLoaded && (
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
                <HeaderDropdown
                  pages={projectData.pages}
                  pageId={pageData.pageId}
                  projectId={projectData.projectId}
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              )}
            </HeaderLeftBlankPageList>
          </>
        )}
      </HeaderLeft>
      {isPageLoaded && (
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

export default Header;
