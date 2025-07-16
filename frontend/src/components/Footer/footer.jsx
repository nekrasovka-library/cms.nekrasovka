import React from "react";
import {
  FooterContainer,
  QuestionButton,
  LogoSection,
  NavLink,
  NavSection,
  OrganizationLink,
  FooterComponent,
} from "./footer.styles.js";
import Icon from "../../nekrasovka-ui/Icon/icon";

const Footer = ({ backgroundColor, maxWidth, paddingTop, paddingBottom }) => {
  return (
    <FooterContainer
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <FooterComponent $maxWidth={maxWidth}>
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
      </FooterComponent>
    </FooterContainer>
  );
};

export default Footer;
