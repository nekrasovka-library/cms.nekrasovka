import React from "react";

export default ({ width = "14", height = "14", fill = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <path d="M5.875 6.79V13h2.25V6.79H11.5L7 1 2.5 6.79h3.375Z" fill={fill} />
    </svg>
  );
};
