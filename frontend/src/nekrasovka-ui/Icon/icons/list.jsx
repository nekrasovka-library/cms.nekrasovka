import React from "react";

export default ({ width = "30", height = "30", fill = "#777777" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 2.72727H0V0H30V2.72727ZM30 6.81818H0V9.54545H30V6.81818ZM30 13.6364H0V16.3636H30V13.6364ZM30 20.4545H0V23.1818H30V20.4545ZM30 27.2727H0V30H30V27.2727Z"
        fill={fill}
      />
    </svg>
  );
};
