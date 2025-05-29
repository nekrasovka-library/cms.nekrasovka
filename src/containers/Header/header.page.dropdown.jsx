import React from "react";
import {
  HeaderPageDropdownContainer,
  HeaderPageDropdownLink,
} from "./header.styles.js";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";

const HeaderPageDropdown = ({
  pages,
  pageId,
  projectId,
  setIsDropdownOpen,
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
          {page.position === 1 && <Icon icon="home" height={10} width={10} />}
          <span>{page.name}</span>
        </HeaderPageDropdownLink>
      ))}
    </HeaderPageDropdownContainer>
  );
};

export default HeaderPageDropdown;
