import React, { useState } from "react";
import {
  ModalContent,
  ModalOverlay,
  Form,
  ButtonGroup,
  Button,
  FormTitle,
} from "../projects.styles.js";
import {
  RadiusContainer,
  RadiusInput,
  SettingsLabel,
} from "../../Settings/settings.styles.js";

const ProjectCreate = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    href: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <FormTitle>Новый проект</FormTitle>
        <Form>
          <RadiusContainer>
            <SettingsLabel>Название проекта</SettingsLabel>
            <RadiusInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </RadiusContainer>
          <RadiusContainer>
            <SettingsLabel>Адрес сайта</SettingsLabel>
            <RadiusInput
              type="url"
              name="href"
              value={formData.href}
              onChange={handleChange}
            />
          </RadiusContainer>
          <ButtonGroup>
            <Button type="button" className="secondary" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" className="primary" onClick={handleSubmit}>
              Создать
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProjectCreate;
