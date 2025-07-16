import React from "react";
import {
  HeaderContainer,
  LogoSection,
  WorkingHoursSection,
  ClockIcon,
  WorkingHoursInfo,
  StatusText,
  AddressLink,
  SocialLinksSection,
  HeaderComponent,
} from "./header.styles.js";
import Icon from "../../nekrasovka-ui/Icon/icon";

const Header = ({ backgroundColor, maxWidth, paddingTop, paddingBottom }) => {
  return (
    <HeaderContainer
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <HeaderComponent $maxWidth={maxWidth}>
        <LogoSection>
          <a href="//nekrasovka.ru/" target="_blank" rel="noopener noreferrer">
            <Icon icon="nekrasovka" />
          </a>
          <a href="//mos.ru/kultura/" target="_blank" rel="noopener noreferrer">
            <Icon icon="mos" />
          </a>
        </LogoSection>

        <WorkingHoursSection>
          <ClockIcon src="/clock.png" alt="Часы работы" />
          <WorkingHoursInfo>
            <StatusText>Главное здание сегодня: санитарный день</StatusText>
            <AddressLink
              href="//biblioteka.nekrasovka.ru/addresses"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Адреса и часы работы библиотек"
            >
              <span>Адреса и часы работы</span>
              <Icon icon="clock" />
            </AddressLink>
          </WorkingHoursInfo>
        </WorkingHoursSection>

        <SocialLinksSection>
          <a
            href="//vk.com/nekrasovkalibrary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="vkRound" />
          </a>
          <a
            href="//t.me/nekrasovkalibrary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="telegramRound" />
          </a>
        </SocialLinksSection>
      </HeaderComponent>
    </HeaderContainer>
  );
};

export default Header;
