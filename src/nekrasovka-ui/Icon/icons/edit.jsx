import React from "react";

export default ({ width = "15", height = "14", fill = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="m2.495 9.634 2.108 2.108-3.07 1.116a.12.12 0 0 1-.154-.154l1.116-3.07ZM5.399 10.888l-2-2.157L9.72 2.408l2.108 2.108-6.43 6.372ZM12.732 3.613l-2.11-2.105L12 .13a.18.18 0 0 1 .255 0l1.854 1.85a.18.18 0 0 1 0 .255l-1.377 1.378Z"
        fill={fill}
      ></path>
    </svg>
  );
};
