import React from "react";
import {
  PaddingContainer,
  SettingsLabel,
  PaddingSelect,
} from "./settings.styles.js";

const PADDING_OPTIONS = [
  { value: "", label: "Не задан" },
  { value: "0px", label: "0" },
  { value: "15px", label: "0.5 line (15px)" },
  { value: "30px", label: "1 line (30px)" },
  { value: "45px", label: "1.5 line (45px)" },
  { value: "60px", label: "2 line (60px)" },
  { value: "75px", label: "2.5 line (75px)" },
  { value: "90px", label: "3 line (90px)" },
  { value: "105px", label: "3.5 line (105px)" },
  { value: "120px", label: "4 line (120px)" },
  { value: "135px", label: "4.5 line (135px)" },
  { value: "150px", label: "5 line (150px)" },
  { value: "165px", label: "5.5 line (165px)" },
  { value: "180px", label: "6 line (180px)" },
  { value: "195px", label: "6.5 line (195px)" },
  { value: "210px", label: "7 line (210px)" },
];

const PaddingSelectField = ({ label, name, value, onChange }) => (
  <div>
    <SettingsLabel>{label}</SettingsLabel>
    <PaddingSelect name={name} onChange={onChange} value={value}>
      {PADDING_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </PaddingSelect>
  </div>
);

const Padding = ({ paddingBottom, paddingTop, handleSettingsChange }) => {
  return (
    <PaddingContainer>
      <PaddingSelectField
        label="Отступ сверху"
        name="paddingTop"
        value={paddingTop}
        onChange={handleSettingsChange}
      />
      <PaddingSelectField
        label="Отступ снизу"
        name="paddingBottom"
        value={paddingBottom}
        onChange={handleSettingsChange}
      />
    </PaddingContainer>
  );
};

export default Padding;
