import React, { useState } from "react";
import {
  ColorChange,
  ColorCircle,
  ColorContainer,
  ColorInput,
  SettingsLabel,
} from "./settings.styles.js";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";

const Color = () => {
  const [color, setColor] = useState("transparent"); // Начальный цвет по умолчанию

  const handleColorChange = (e) => {
    setColor(e.target.value); // Обновляем состояние при изменении цвета
  };

  return (
    <ColorContainer>
      <SettingsLabel>Цвет фона для всего блока</SettingsLabel>
      <ColorChange>
        <ColorCircle $backgroundColor={color} />
        <ColorInput
          type="text"
          value={color === "transparent" ? "" : color}
          onChange={handleColorChange}
          placeholder="#ffffff"
        />
        <Icon
          icon="close_menu"
          type="button"
          onClick={() => setColor("transparent")}
        />
      </ColorChange>
    </ColorContainer>
  );
};

export default Color;
