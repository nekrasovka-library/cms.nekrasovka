import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonContainer,
  ButtonForm,
  ButtonFormCheckbox,
} from "./button.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { RadiusInput, SettingsLabel } from "../Settings/settings.styles.js";

const BUTTON_LABELS = {
  link: "Ссылка для кнопки",
  text: "Текст кнопки",
  placeholderLink: "nekrasovka.ru",
  placeholderText: "Текст",
};

const DEFAULT_TARGET = "_blank";

const ButtonConstructor = ({
  text,
  border,
  color,
  borderRadius,
  height,
  textAlign,
  backgroundColor,
  blockId,
  itemId,
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(null);
  const { isSettingsOpen } = useSelector((state) => state.settings);

  const handleToggleEditing = (e) => {
    e.preventDefault();
    setIsEditing((prev) => !prev);
    if (!isEditing && isSettingsOpen) {
      dispatch({ type: "TOGGLE_SETTINGS" });
    }
  };

  const contentHandler = {
    extractFromHTML: (html) => {
      const hrefMatch = html.match(/href="(?:\/\/)?([^"]*)"/);
      const textMatch = html.match(/<span>(.*?)<\/span>/);
      const targetMatch = html.match(/target="([^"]*)"/);
      return {
        href: hrefMatch ? hrefMatch[1] : "",
        text: textMatch ? textMatch[1] : "",
        target: targetMatch ? targetMatch[1] : "",
      };
    },
    saveUpdatedContent: () => {
      const updatedText = text
        .replace(/href="([^"]*)"/, `href="//${content.href}"`)
        .replace(/target="([^"]*)"/, `target="${content.target}"`)
        .replace(/<span>(.*?)<\/span>/, `<span>${content.text}</span>`);

      setIsEditing(false);
      dispatch({
        type: "UPDATE_BLOCK",
        payload: { blockId, itemId, text: updatedText },
      });
    },
  };

  const renderInputField = (label, name, value, placeholder, onChange) => (
    <div>
      <SettingsLabel>{label}</SettingsLabel>
      <RadiusInput
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {name === "href" && (
        <ButtonFormCheckbox>
          <input
            checked={content.target === DEFAULT_TARGET}
            type="checkbox"
            name="target"
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                target: e.target.checked ? DEFAULT_TARGET : "",
              }))
            }
          />
          <span>В новом окне</span>
        </ButtonFormCheckbox>
      )}
    </div>
  );

  useEffect(() => {
    if (!content) {
      setContent(contentHandler.extractFromHTML(text));
    }
  }, [content, text]);

  useEffect(() => {
    if (isSettingsOpen) {
      setIsEditing(false);
    }
  }, [isSettingsOpen]);

  const buttonStyles = {
    $border: border,
    $color: color,
    $borderRadius: borderRadius,
    $height: height,
    $textAlign: textAlign,
    $backgroundColor: backgroundColor,
  };

  return (
    <ButtonContainer>
      <Button
        {...buttonStyles}
        onClick={handleToggleEditing}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {isEditing && (
        <ButtonForm $textAlign={buttonStyles.$textAlign}>
          {renderInputField(
            BUTTON_LABELS.link,
            "href",
            content?.href,
            BUTTON_LABELS.placeholderLink,
            (value) => setContent((prev) => ({ ...prev, href: value })),
          )}
          {renderInputField(
            BUTTON_LABELS.text,
            "text",
            content?.text,
            BUTTON_LABELS.placeholderText,
            (value) => setContent((prev) => ({ ...prev, text: value })),
          )}
          <div>
            <button type="button" onClick={handleToggleEditing}>
              Отмена
            </button>
            <button type="button" onClick={contentHandler.saveUpdatedContent}>
              Сохранить
            </button>
          </div>
        </ButtonForm>
      )}
    </ButtonContainer>
  );
};

export default ButtonConstructor;
