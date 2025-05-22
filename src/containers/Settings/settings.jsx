import React, { useEffect, useState } from "react";
import { Container1, SettingsTitleLabel } from "./settings.styles.js";
import { useDispatch, useSelector } from "react-redux";
import Padding from "./padding.jsx";
import Header from "./header.jsx";
import Columns from "./columns.jsx";
import BackgroundColor from "./background-color.jsx";
import Align from "./align.jsx";
import Radius from "./radius.jsx";
import Color from "./color.jsx";
import Opacity from "./opacity.jsx";
import Gap from "./gap.jsx";
import Height from "./height.jsx";
import Border from "./border.jsx";
import ElementBackgroundColor from "./element-background-color.jsx";

const Settings = () => {
  const dispatch = useDispatch();
  const { isSettingsOpen } = useSelector((state) => state.settings);
  const { selectedBlockIndex, block } = useSelector((state) => state.blocks);
  const { variant } = useSelector((state) => state.menu);
  const [blockSettings, setBlockSettings] = useState(null);

  const updateBlockStyles = (payload) =>
    dispatch({ type: "UPDATE_BLOCK_STYLES", payload });

  const toggleSettings = () => dispatch({ type: "TOGGLE_SETTINGS" });

  const resetBlockSelection = () =>
    dispatch({ type: "SET_BLOCK", payload: { blockIndex: null } });

  const saveSettings = () => updateBlockStyles(blockSettings);

  const saveAndExitSettings = () => {
    saveSettings();
    toggleSettings();
    resetBlockSelection();
  };

  const handleSettingsChange = ({ target: { name, value } }) => {
    setBlockSettings((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (selectedBlockIndex !== null) {
      dispatch({ type: "GET_BLOCK" });

      if (block) {
        if (block.variantId) {
          dispatch({
            type: "GET_VARIANT",
            payload: { id: block.variantId },
          });
        }

        setBlockSettings(block.styles);
      }
    }
  }, [selectedBlockIndex, block, dispatch]);

  const renderSettingsComponent = (
    Component,
    propKey,
    additionalProps = {},
  ) => {
    if (Array.isArray(propKey)) {
      const propsAreDefined = propKey.every(
        (key) => blockSettings?.[key] !== undefined,
      );
      if (!propsAreDefined) return null;
      const extractedProps = propKey.reduce(
        (acc, key) => ({ ...acc, [key]: blockSettings[key] }),
        {},
      );
      return (
        <Component
          {...extractedProps}
          {...additionalProps}
          handleSettingsChange={handleSettingsChange}
          defaultStyles={variant?.styles}
        />
      );
    }
    if (blockSettings?.[propKey] !== undefined) {
      return (
        <Component
          {...{ [propKey]: blockSettings[propKey] }}
          {...additionalProps}
          handleSettingsChange={handleSettingsChange}
          defaultStyles={variant?.styles}
        />
      );
    }
    return null;
  };

  return (
    <Container1 $isMenuOpen={isSettingsOpen}>
      <Header
        saveSettings={saveSettings}
        saveAndExitSettings={saveAndExitSettings}
      />
      <SettingsTitleLabel>Настройки блока</SettingsTitleLabel>
      {renderSettingsComponent(Columns, "maxWidth")}
      {renderSettingsComponent(Gap, "gap")}
      {renderSettingsComponent(Align, "textAlign")}
      {renderSettingsComponent(Padding, ["paddingTop", "paddingBottom"])}
      {renderSettingsComponent(BackgroundColor, "backgroundColor")}
      <SettingsTitleLabel>Настройки элемента</SettingsTitleLabel>
      {renderSettingsComponent(Color, "color")}
      {renderSettingsComponent(
        ElementBackgroundColor,
        "elementBackgroundColor",
      )}
      {renderSettingsComponent(Opacity, "opacity")}
      {renderSettingsComponent(Radius, "borderRadius")}
      {renderSettingsComponent(Border, "border")}
      {renderSettingsComponent(Height, "height")}
    </Container1>
  );
};

export default Settings;
