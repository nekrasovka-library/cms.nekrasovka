import React from "react";
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
import HeaderPageDropdown from "./header.page.dropdown.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { isPreview } = useSelector((state) => state.preview);
  const { projectData } = useSelector((state) => state.project);
  const { pageData, isPageLoaded } = useSelector((state) => state.page);
  const { blocks } = useSelector((state) => state.blocks);

  const handleToggleView = () => {
    dispatch({ type: "TOGGLE_PREVIEW" });
  };

  const handleSaveProjectPage = () => {
    dispatch({
      type: "UPDATE_PROJECT_PAGE_REQUEST",
      projectId: projectData.projectId,
      pageId: pageData.pageId,
      page: {
        ...pageData,
        blocks,
      },
    });
  };

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
            >
              <Icon icon="blankPage" />
              <span>{pageData.name}</span>
              {isDropdownOpen && (
                <HeaderPageDropdown
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
