import React from "react";

export default ({ width = "14", height = "14", fill = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <path d="M8.125 7.21V1h-2.25v6.21H2.5L7 13l4.5-5.79H8.125Z" fill={fill} />
    </svg>
  );
};
