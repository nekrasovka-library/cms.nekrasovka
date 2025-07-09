import React, { memo } from "react";

const HeaderConstructor = memo(({ text }) => (
  <div dangerouslySetInnerHTML={{ __html: text }} />
));

export default HeaderConstructor;
