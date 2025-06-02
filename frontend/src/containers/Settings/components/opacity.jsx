import React from "react";
import {
  PaddingContainer,
  SettingsLabel,
  PaddingSelect,
} from "../settings.styles.js";

const OPACITY_OPTIONS = [
  { value: "0", label: "0" },
  { value: "0.1", label: "10%" },
  { value: "0.2", label: "20%" },
  { value: "0.3", label: "30%" },
  { value: "0.4", label: "40%" },
  { value: "0.5", label: "50%" },
  { value: "0.6", label: "60%" },
  { value: "0.7", label: "70%" },
  { value: "0.8", label: "80%" },
  { value: "0.9", label: "90%" },
  { value: "1", label: "100%" },
];

const PaddingSelectField = ({ label, name, value, onChange }) => (
  <div>
    <SettingsLabel>{label}</SettingsLabel>
    <PaddingSelect name={name} onChange={onChange} value={value}>
      {OPACITY_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </PaddingSelect>
  </div>
);

const Opacity = ({ opacity, handleSettingsChange }) => {
  return (
    <PaddingContainer>
      <PaddingSelectField
        label="Непрозрачность"
        name="opacity"
        value={opacity}
        onChange={handleSettingsChange}
      />
    </PaddingContainer>
  );
};

export default Opacity;
