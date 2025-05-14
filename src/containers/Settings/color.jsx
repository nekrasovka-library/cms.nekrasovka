import React from "react";
import {
  ColorChange,
  ColorCircle,
  ColorContainer,
  ColorInput,
  SettingsLabel,
} from "./settings.styles.js";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";

const Color = ({ color, handleSettingsChange }) => {
  return (
    <ColorContainer>
      <SettingsLabel>Цвет</SettingsLabel>
      <ColorChange>
        <ColorCircle $backgroundColor={color} />
        <ColorInput
          type="text"
          name="color"
          value={color === "transparent" ? "" : color}
          onChange={handleSettingsChange}
          placeholder="#000"
        />
        <Icon
          icon="close_menu"
          type="button"
          onClick={() =>
            handleSettingsChange({
              target: { name: "color", value: "" },
            })
          }
        />
      </ColorChange>
    </ColorContainer>
  );
};

export default Color;
