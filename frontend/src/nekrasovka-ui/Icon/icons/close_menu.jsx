import React from "react";

export default ({ width = 16, height = 16, fill = "#000" }) => (
  <svg xmlns="//www.w3.org/2000/svg" width={width} height={height} fill="none">
    <path
      fill={fill}
      fillRule="evenodd"
      d="m8.068 8.595 6.312 6.188.678-.665-6.311-6.19 6.312-6.187-.68-.666-6.311 6.189L1.62.94l-.68.666 6.45 6.323-6.448 6.323.678.665 6.448-6.322Z"
      clipRule="evenodd"
    />
  </svg>
);
