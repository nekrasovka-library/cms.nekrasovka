import React from "react";

const HeaderConstructor = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
};

export default HeaderConstructor;
