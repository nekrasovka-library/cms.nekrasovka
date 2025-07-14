import React, { memo } from "react";

const Header = memo(({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
});

export default Header;
