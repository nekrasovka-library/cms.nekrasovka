import React from "react";
import {
  BorderContainer,
  ColorChange,
  ColorCircle,
  ColorInput,
  PaddingSelect,
  RadiusInput,
  SettingsLabel,
} from "./settings.styles.js";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";

const STYLE_OPTIONS = [
  { value: "solid", label: "Полная" },
  { value: "dashed", label: "Пунктирная" },
  { value: "dotted", label: "Точечная" },
];

const Border = ({ border, handleSettingsChange, defaultStyles }) => {
  const handleBorderChange = ({ target: { name, value } }) => {
    handleSettingsChange({
      target: {
        name: "border",
        value: {
          ...border,
          [name]: value,
        },
      },
    });
  };

  return (
    <BorderContainer>
      <div>
        <div>
          <SettingsLabel>Толщина бордюра</SettingsLabel>
          <RadiusInput
            type="number"
            name="width"
            value={border.width}
            onChange={handleBorderChange}
            placeholder="0"
          />
        </div>
        <div>
          <SettingsLabel>Стиль бордюра</SettingsLabel>
          <PaddingSelect
            name="style"
            onChange={handleBorderChange}
            value={border.style}
          >
            {STYLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </PaddingSelect>
        </div>
      </div>
      <div>
        <SettingsLabel>Цвет бордюра</SettingsLabel>
        <ColorChange>
          <ColorCircle $backgroundColor={border.color} />
          <ColorInput
            type="text"
            name="color"
            value={border.color === "transparent" ? "" : border.color}
            onChange={handleBorderChange}
            placeholder="#000"
          />
          <Icon
            icon="close_menu"
            type="button"
            onClick={() =>
              handleBorderChange({
                target: { name: "color", value: defaultStyles.border.color },
              })
            }
          />
        </ColorChange>
      </div>
    </BorderContainer>
  );
};

export default Border;
