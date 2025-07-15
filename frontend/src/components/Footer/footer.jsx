import React from "react";
import {
  FooterContainer,
  QuestionButton,
  Logo,
  LogoSection,
  NavLink,
  NavSection,
  OrganizationLink,
} from "./footer.styles.js";

const Footer = () => {
  return (
    <FooterContainer>
      <LogoSection>
        <a href="//mos.ru/kultura/" target="_blank" rel="noopener noreferrer">
          <Logo src="/nekrasovka.png" alt="" />
        </a>
        <a href="//nekrasovka.ru/" target="_blank" rel="noopener noreferrer">
          <Logo src="/mos.png" alt="" />
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
          <img src="/question.png" alt="Вопрос" />
          <span>Задать вопрос</span>
        </QuestionButton>
      </NavSection>
    </FooterContainer>
  );
};

export default Footer;
