import React from "react";
import {
  AlignContainer,
  PaddingSelect,
  SettingsLabel,
} from "./settings.styles.js";

const ALIGN_OPTIONS = [
  { value: "left", label: "По левому краю" },
  { value: "center", label: "По центру" },
  { value: "right", label: "По правому краю" },
];

const AlignSelectField = ({ label, name, value, onChange }) => (
  <div>
    <SettingsLabel>{label}</SettingsLabel>
    <PaddingSelect name={name} onChange={onChange} value={value}>
      {ALIGN_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </PaddingSelect>
  </div>
);

const Align = ({ textAlign, handleSettingsChange }) => {
  return (
    <AlignContainer>
      <AlignSelectField
        label="Выравнивание"
        name="textAlign"
        value={textAlign}
        onChange={handleSettingsChange}
      />
    </AlignContainer>
  );
};

export default Align;
