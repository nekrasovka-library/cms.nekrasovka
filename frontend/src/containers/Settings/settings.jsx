import React, { useEffect, useState } from "react";
import { Container1, SettingsTitleLabel } from "./settings.styles.js";
import { useDispatch, useSelector } from "react-redux";
import Padding from "./components/padding.jsx";
import Header from "./components/header.jsx";
import Columns from "./components/columns.jsx";
import BackgroundColor from "./components/background-color.jsx";
import Align from "./components/align.jsx";
import Radius from "./components/radius.jsx";
import Color from "./components/color.jsx";
import Opacity from "./components/opacity.jsx";
import Gap from "./components/gap.jsx";
import Height from "./components/height.jsx";
import Border from "./components/border.jsx";
import ElementBackgroundColor from "./components/element-background-color.jsx";
import Tracks from "./components/tracks.jsx";

const Settings = () => {
  const dispatch = useDispatch();
  const { isSettingsOpen } = useSelector((state) => state.settings);
  const { block } = useSelector((state) => state.blocks);
  const { variant } = useSelector((state) => state.menu);
  const [blockSettings, setBlockSettings] = useState(null);

  const updateBlockStyles = (payload) => {
    dispatch({ type: "UPDATE_BLOCK_STYLES", payload });

    if (
      payload.tracks &&
      payload.tracks !== block.styles.tracks &&
      block.items[0].type === "text"
    ) {
      const divs = [...block.items[0].text];

      if (payload.tracks > divs.length) {
        const count = payload.tracks - divs.length;
        for (let i = 0; i < count; i++) {
          divs.push(`<div><span>Добавить текст</span></div>`);
        }
      } else {
        const count = divs.length - payload.tracks;
        for (let i = 0; i < count; i++) {
          divs.pop();
        }
      }

      dispatch({
        type: "UPDATE_BLOCK",
        payload: { blockId: block.id, text: divs },
      });
    }
  };

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
    if (isSettingsOpen) {
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
  }, [isSettingsOpen, block, dispatch]);

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
      {renderSettingsComponent(Tracks, "tracks")}
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
