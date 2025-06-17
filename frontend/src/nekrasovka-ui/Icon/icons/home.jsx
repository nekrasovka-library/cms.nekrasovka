import React from "react";

export default ({ width = "15", height = "15", fill = "black" }) => {
  return (
    <svg
      xmlns="//www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M5.83333 9.91667H9.16667V14.5H12.9167L13 7.5H14H15L7.5 0L0 7.5H2.08333V14.5H5.83333V9.91667Z"
        fill={fill}
      ></path>
    </svg>
  );
};
