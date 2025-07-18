import React from "react";

export default ({ width = 16, height = 16, fill = "#777777" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 8.78167L6.17333 4.99208L9.96167 1.16958L8.78167 0L4.99417 3.82458L1.17083 0.0379167L0 1.20875L3.8275 5.0025L0.0379167 8.82917L1.20875 10L5.00542 6.17L8.83042 9.96167L10 8.78167Z"
      fill={fill}
    />
  </svg>
);
