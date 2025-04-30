import React, { useEffect, useState } from "react";
import {
  Container1,
  Header,
  HeaderButtons,
  HeaderButtonSave,
  HeaderButtonSaveAndExit,
  PaddingLabel,
  PaddingSelect,
  PaddingContainer,
} from "./settings.styles.js";
import { useDispatch, useSelector } from "react-redux";

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
    <PaddingLabel>{label}</PaddingLabel>
    <PaddingSelect name={name} onChange={onChange} value={value}>
      {PADDING_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </PaddingSelect>
  </div>
);

const Settings = () => {
  const dispatch = useDispatch();
  const { isSettingsOpen } = useSelector((state) => state.settings);
  const blocks = useSelector((state) => state.blocks);
  const [settings, setSettings] = useState(null);

  const saveSettings = () => {
    dispatch({ type: "UPDATE_BLOCK_STYLES", payload: settings });
  };

  const saveAndExitSettings = () => {
    dispatch({ type: "UPDATE_BLOCK_STYLES", payload: settings });
    dispatch({ type: "TOGGLE_SETTINGS" });
    dispatch({ type: "SET_BLOCK", payload: { blockIndex: null } });
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setSettings(blocks.data[blocks.selectedBlockIndex]?.styles);
  }, [blocks.selectedBlockIndex]);

  return (
    <Container1 $isMenuOpen={isSettingsOpen}>
      <Header>
        <HeaderButtons>
          <HeaderButtonSave type="button" onClick={saveSettings}>
            Сохранить
          </HeaderButtonSave>
          <HeaderButtonSaveAndExit type="button" onClick={saveAndExitSettings}>
            Сохранить и закрыть
          </HeaderButtonSaveAndExit>
        </HeaderButtons>
      </Header>
      <PaddingContainer>
        <PaddingSelectField
          label="Отступ сверху"
          name="paddingTop"
          value={settings?.paddingTop}
          onChange={handleSettingsChange}
        />
        <PaddingSelectField
          label="Отступ снизу"
          name="paddingBottom"
          value={settings?.paddingBottom}
          onChange={handleSettingsChange}
        />
      </PaddingContainer>
    </Container1>
  );
};

export default Settings;
