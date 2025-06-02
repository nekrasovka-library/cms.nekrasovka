import React from "react";

export default ({ width = "11", height = "13", fill = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 4h9v9H1V4Zm2 2.038V11h1V6.038H3Zm2 0V11h1V6.038H5Zm2 0V11h1V6.038H7ZM0 1h11v2H0V1Zm4-1h3v1H4V0Z"
        fill={fill}
      />
    </svg>
  );
};
