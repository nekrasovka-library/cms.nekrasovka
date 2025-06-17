import React from "react";

export default ({ width = "29", height = "29", fill = "#000" }) => {
  return (
    <svg
      xmlns="//www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <circle cx="14.5" cy="14.5" r="13.5" fill={fill} />
      <circle cx="14.5" cy="14.5" r="14" stroke="#fff" strokeOpacity=".3" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.904 9.55v4.373H9.7v1.116h4.205v4.41h1.192v-4.41H19.3v-1.116h-4.205V9.551h-1.192Z"
        fill="#fff"
      />
    </svg>
  );
};
