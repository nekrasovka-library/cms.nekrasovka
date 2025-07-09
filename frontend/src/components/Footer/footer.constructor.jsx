import React, { memo } from "react";

const FooterConstructor = memo(({ text }) => (
  <div dangerouslySetInnerHTML={{ __html: text }} />
));

export default FooterConstructor;
