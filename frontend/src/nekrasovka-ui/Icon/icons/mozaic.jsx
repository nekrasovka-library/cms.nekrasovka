import React from "react";

export default ({ width = "30", height = "30", fill = "#346178" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="13" height="13" fill={fill} />
      <rect x="17" width="13" height="13" fill={fill} />
      <rect y="17" width="13" height="13" fill={fill} />
      <rect x="17" y="17" width="13" height="13" fill={fill} />
    </svg>
  );
};
