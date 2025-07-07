import React from "react";

const FooterPreview = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
};

export default FooterPreview;
