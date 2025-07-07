import React from "react";

const FooterConstructor = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
};

export default FooterConstructor;
