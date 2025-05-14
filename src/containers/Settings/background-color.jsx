import React from "react";
import {
  ColorChange,
  ColorCircle,
  ColorContainer,
  ColorInput,
  SettingsLabel,
} from "./settings.styles.js";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";

const BackgroundColor = ({ backgroundColor, handleSettingsChange }) => {
  return (
    <ColorContainer>
      <SettingsLabel>Цвет фона для всего блока</SettingsLabel>
      <ColorChange>
        <ColorCircle $backgroundColor={backgroundColor} />
        <ColorInput
          type="text"
          name="backgroundColor"
          value={backgroundColor === "transparent" ? "" : backgroundColor}
          onChange={handleSettingsChange}
          placeholder="#ffffff"
        />
        <Icon
          icon="close_menu"
          type="button"
          onClick={() =>
            handleSettingsChange({
              target: { name: "backgroundColor", value: "" },
            })
          }
        />
      </ColorChange>
    </ColorContainer>
  );
};

export default BackgroundColor;
