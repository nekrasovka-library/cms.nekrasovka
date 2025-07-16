import React from "react";

export default ({ width = "20", height = "16", fill = "#346178" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="1" x2="20" y2="1" stroke={fill} strokeWidth="2" />
      <line y1="8" x2="20" y2="8" stroke={fill} strokeWidth="2" />
      <line y1="15" x2="20" y2="15" stroke={fill} strokeWidth="2" />
    </svg>
  );
};
