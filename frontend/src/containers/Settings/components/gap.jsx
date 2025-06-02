import React from "react";
import {
  PaddingContainer,
  SettingsLabel,
  PaddingSelect,
} from "../settings.styles.js";

const GAP_OPTIONS = [
  { value: "0", label: "0" },
  { value: "5", label: "5px" },
  { value: "10", label: "10px" },
  { value: "15", label: "15px" },
  { value: "20", label: "20px" },
  { value: "25", label: "25px" },
  { value: "30", label: "30px" },
  { value: "35", label: "35px" },
  { value: "40", label: "40px" },
  { value: "45", label: "45px" },
  { value: "50", label: "50px" },
];

const PaddingSelectField = ({ label, name, value, onChange }) => (
  <div>
    <SettingsLabel>{label}</SettingsLabel>
    <PaddingSelect name={name} onChange={onChange} value={value}>
      {GAP_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </PaddingSelect>
  </div>
);

const Gap = ({ gap, handleSettingsChange }) => {
  return (
    <PaddingContainer>
      <PaddingSelectField
        label="Расстояние между колонками"
        name="gap"
        value={gap}
        onChange={handleSettingsChange}
      />
    </PaddingContainer>
  );
};

export default Gap;
