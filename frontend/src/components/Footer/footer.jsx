import React from "react";
import {
  FooterContainer,
  QuestionButton,
  LogoSection,
  NavLink,
  NavSection,
  OrganizationLink,
} from "./footer.styles.js";
import Icon from "../../nekrasovka-ui/Icon/icon";

const Footer = () => {
  return (
    <FooterContainer>
      <LogoSection>
        <a href="//mos.ru/kultura/" target="_blank" rel="noopener noreferrer">
          <Icon icon="nekrasovka" />
        </a>
        <a href="//nekrasovka.ru/" target="_blank" rel="noopener noreferrer">
          <Icon icon="mos" />
        </a>
      </LogoSection>
      <NavSection>
        <OrganizationLink href="//nekrasovka.ru/articles/education">
          Сведения об организации, осуществляющей деятельность
        </OrganizationLink>
        <NavLink href="//organizations.kultura.mos.ru/organizations/gbuk_gmoskvy_tsentralnaya_universalnaya_nauchnaya_biblioteka_imeni_nanekrasova.html">
          Оценка качества услуг
        </NavLink>
        <QuestionButton>
          <Icon icon="question" />
          <span>Задать вопрос</span>
        </QuestionButton>
      </NavSection>
    </FooterContainer>
  );
};

export default Footer;
