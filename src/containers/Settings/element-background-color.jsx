import React from "react";
import {
  ColorChange,
  ColorCircle,
  ColorContainer,
  ColorInput,
  SettingsLabel,
} from "./settings.styles.js";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";

const BackgroundColor = ({
  elementBackgroundColor,
  handleSettingsChange,
  defaultStyles,
}) => {
  return (
    <ColorContainer>
      <SettingsLabel>Цвет элемента</SettingsLabel>
      <ColorChange>
        <ColorCircle $backgroundColor={elementBackgroundColor} />
        <ColorInput
          type="text"
          name="elementBackgroundColor"
          value={
            elementBackgroundColor === "transparent"
              ? ""
              : elementBackgroundColor
          }
          onChange={handleSettingsChange}
          placeholder="#ffffff"
        />
        <Icon
          icon="close_menu"
          type="button"
          onClick={() =>
            handleSettingsChange({
              target: {
                name: "elementBackgroundColor",
                value: defaultStyles.elementBackgroundColor,
              },
            })
          }
        />
      </ColorChange>
    </ColorContainer>
  );
};

export default BackgroundColor;
