import React from "react";
import icons from "./icons";

const Button = ({ children, onClick }) => {
  return (
    <button style={{ cursor: "pointer" }} onClick={onClick}>
      {children}
    </button>
  );
};

const Icon = ({ icon, type, onClick, ...props }) => {
  const IconComponent = icons[icon];
  return type === "button" ? (
    <Button onClick={onClick}>
      <IconComponent {...props} />
    </Button>
  ) : (
    <IconComponent {...props} />
  );
};

export default Icon;
