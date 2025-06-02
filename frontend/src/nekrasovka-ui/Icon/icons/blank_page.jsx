import React from "react";

export default ({ width = "15", height = "15", fill = "black" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M8.05 1H3C2.44772 1 2 1.44772 2 2V13C2 13.5523 2.44771 14 3 14H12C12.5523 14 13 13.5523 13 13V5.5M8.05 1L13 5.5M8.05 1V4.5C8.05 5.05228 8.49772 5.5 9.05 5.5H13M5 8.5H10M5 10.5H10"
        stroke={fill}
      ></path>
    </svg>
  );
};
