import React from "react";
import {
  HeaderPageDropdownContainer,
  HeaderPageDropdownLink,
} from "../header.styles.js";
import Icon from "../../../nekrasovka-ui/Icon/icon.jsx";

const HeaderDropdown = ({
  pages,
  pageId,
  projectId,
  setIsDropdownOpen,
  mainPage,
}) => {
  return (
    <HeaderPageDropdownContainer>
      {pages.map((page) => (
        <HeaderPageDropdownLink
          $isActive={page.pageId === pageId}
          key={page.pageId}
          to={`/projects/${projectId}/${page.pageId}`}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          {mainPage === page.pageId ? (
            <Icon icon="home" height={10} width={10} />
          ) : (
            <div />
          )}
          <span>{page.name}</span>
        </HeaderPageDropdownLink>
      ))}
    </HeaderPageDropdownContainer>
  );
};

export default HeaderDropdown;
