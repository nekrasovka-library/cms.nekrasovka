import React from "react";

const HeaderPreview = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
};

export default HeaderPreview;
