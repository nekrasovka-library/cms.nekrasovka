import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonContainer,
  ButtonForm,
  ButtonFormCheckbox,
} from "./button.styles.js";
import { useDispatch } from "react-redux";
import { RadiusInput, SettingsLabel } from "../Settings/settings.styles.js";

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

  const toggleEditing = (e) => {
    e.preventDefault();
    setIsEditing((prev) => !prev);
  };

  const extractContentFromHTML = (html) => {
    const hrefMatch = html.match(/href="(?:\/\/)?([^"]*)"/);
    const textMatch = html.match(/<span>(.*?)<\/span>/);
    const targetMatch = html.match(/target="([^"]*)"/);

    return {
      href: hrefMatch ? hrefMatch[1] : "",
      text: textMatch ? textMatch[1] : "",
      target: targetMatch ? targetMatch[1] : "",
    };
  };

  const handleSave = () => {
    const updatedText = text
      .replace(/href="([^"]*)"/, `href="//${content.href}"`)
      .replace(/target="([^"]*)"/, `target="${content.target}"`)
      .replace(/<span>(.*?)<\/span>/, `<span>${content.text}</span>`);

    setIsEditing(false);
    dispatch({
      type: "UPDATE_BLOCK",
      payload: { blockId, itemId, text: updatedText },
    });
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
            checked={content.target === "_blank"}
            type="checkbox"
            name="target"
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                target: e.target.checked ? "_blank" : "",
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
      setContent(extractContentFromHTML(text));
    }
  }, [content, text]);

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
      {isEditing && (
        <ButtonForm>
          {renderInputField(
            "Ссылка для кнопки",
            "href",
            content.href,
            "nekrasovka.ru",
            (value) => setContent((prev) => ({ ...prev, href: value })),
          )}
          {renderInputField(
            "Текст кнопки",
            "text",
            content.text,
            "Текст",
            (value) => setContent((prev) => ({ ...prev, text: value })),
          )}
          <div>
            <button type="button" onClick={toggleEditing}>
              Отмена
            </button>
            <button type="button" onClick={handleSave}>
              Сохранить
            </button>
          </div>
        </ButtonForm>
      )}
      <Button
        {...buttonStyles}
        onClick={toggleEditing}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </ButtonContainer>
  );
};

export default ButtonConstructor;
