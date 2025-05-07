import React from "react";
import {
  RadiusContainer,
  RadiusInput,
  SettingsLabel,
} from "./settings.styles.js";

const Radius = ({ borderRadius, handleSettingsChange }) => {
  return (
    <RadiusContainer>
      <SettingsLabel>Радиус скругления изображения</SettingsLabel>
      <RadiusInput
        type="number"
        min="0"
        max="50"
        name="borderRadius"
        value={borderRadius || ""}
        onChange={handleSettingsChange}
        placeholder="0"
      />
    </RadiusContainer>
  );
};

export default Radius;
