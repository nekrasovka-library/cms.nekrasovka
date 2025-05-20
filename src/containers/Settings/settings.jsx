import React, { useEffect, useState } from "react";
import { Container1 } from "./settings.styles.js";
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

const Settings = () => {
  const dispatch = useDispatch();
  const { isSettingsOpen } = useSelector((state) => state.settings);
  const { selectedBlockIndex, blocks } = useSelector((state) => state.blocks);
  const [blockSettings, setBlockSettings] = useState(null);
  const [defaultStyles, setDefaultStyles] = useState(null);
  const menu = useSelector((state) => state.menu);

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

  const findByMenuId = (data, variantId) => {
    for (const obj of data) {
      const foundVariant = obj.variant.find(
        (variant) => variant.id === variantId,
      );

      if (foundVariant) {
        return foundVariant.styles; // Возвращаем найденный элемент
      }
    }

    return null; // Возвращаем null, если элемент не найден
  };

  useEffect(() => {
    setBlockSettings(blocks?.[selectedBlockIndex]?.styles || null);

    const variantId = blocks?.[selectedBlockIndex]?.items[0].variantId;
    const variant = findByMenuId(menu.data, variantId);
    setDefaultStyles(variant);
  }, [selectedBlockIndex, blocks, menu]);

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
        />
      );
    }
    if (blockSettings?.[propKey] !== undefined) {
      return (
        <Component
          {...{ [propKey]: blockSettings[propKey] }}
          {...additionalProps}
          handleSettingsChange={handleSettingsChange}
          defaultStyles={defaultStyles}
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
      {renderSettingsComponent(Columns, "maxWidth")}
      {renderSettingsComponent(Gap, "gap")}
      {renderSettingsComponent(Align, "textAlign")}
      {renderSettingsComponent(Color, "color")}
      {renderSettingsComponent(Opacity, "opacity")}
      {renderSettingsComponent(Padding, ["paddingTop", "paddingBottom"])}
      {renderSettingsComponent(BackgroundColor, "backgroundColor")}
      {renderSettingsComponent(Radius, "borderRadius")}
      {renderSettingsComponent(Border, "border")}
      {renderSettingsComponent(Height, "height")}
    </Container1>
  );
};

export default Settings;
