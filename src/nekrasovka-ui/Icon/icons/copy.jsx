import React from "react";

export default ({ width = 14, height = 14, fill = "#000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
  >
    <path d="M9.7 8.6h1.8V2.1H5.7V4H4.2V.6H13v9.5H9.8l-.1-1.5Z" fill={fill} />
    <path d="M6.2 3.9h3.6v9.5H1V3.9h5.2Zm-3.7 8h5.8V5.4H2.5v6.5Z" fill={fill} />
  </svg>
);
