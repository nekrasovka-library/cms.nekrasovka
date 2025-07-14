import React, { memo } from "react";

const Footer = memo(({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
});

export default Footer;
