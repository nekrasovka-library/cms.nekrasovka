import React, { useState } from "react";
import {
  ModalContent,
  ModalOverlay,
  Form,
  ButtonGroup,
  Button,
  FormTitle,
  FormTemplate,
  FormTemplateCard,
} from "../projects.styles.js";
import {
  RadiusContainer,
  RadiusInput,
  SettingsLabel,
} from "../../Settings/settings.styles.js";

const DEFAULT_IMAGE = `imgfish.jpg`;
const initialState = {
  name: "",
  href: "",
  template: "",
};

const ProjectCreate = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData(initialState);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
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
          <RadiusContainer>
            <SettingsLabel>Выберите шаблон</SettingsLabel>
            <FormTemplate>
              <FormTemplateCard
                $isFormCardSlected={formData.template === "empty"}
                onClick={() => setFormData({ ...formData, template: "empty" })}
              >
                <div>
                  <img
                    src={`${process.env.REACT_APP_URL}${DEFAULT_IMAGE}`}
                    alt=""
                  />
                </div>
                <div>
                  <h4>Пустой проект</h4>
                  <p>Начните с чистого листа</p>
                </div>
              </FormTemplateCard>
              <FormTemplateCard
                $isFormCardSlected={formData.template === "header-footer"}
                onClick={() =>
                  setFormData({ ...formData, template: "header-footer" })
                }
              >
                <div>
                  <img
                    src={`${process.env.REACT_APP_URL}${DEFAULT_IMAGE}`}
                    alt=""
                  />
                </div>
                <div>
                  <h4>Шаблон с шапкой и подвалом</h4>
                  <p>Базовая структура сайта</p>
                </div>
              </FormTemplateCard>
            </FormTemplate>
          </RadiusContainer>
          <ButtonGroup>
            <Button type="button" className="secondary" onClick={handleClose}>
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
