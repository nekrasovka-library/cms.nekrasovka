import React, { memo } from "react";
import {
  HeaderContainer,
  LogoSection,
  Logo,
  WorkingHoursSection,
  ClockIcon,
  WorkingHoursInfo,
  StatusText,
  AddressLink,
  SocialLinksSection,
  SocialIcon,
} from "./header.styles.js";
import Icon from "../../nekrasovka-ui/Icon/icon";

const Header = memo(() => {
  return (
    <HeaderContainer>
      <LogoSection>
        <a href="//nekrasovka.ru/" target="_blank" rel="noopener noreferrer">
          <Logo src="/nekrasovka.png" alt="Некрасовка" />
        </a>
        <a href="//mos.ru/kultura/" target="_blank" rel="noopener noreferrer">
          <Logo src="/mos.png" alt="Москва-Культура" />
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
          <SocialIcon src="/vk.png" alt="ВКонтакте" />
        </a>
        <a
          href="//t.me/nekrasovkalibrary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon src="/telegram.png" alt="Telegram" />
        </a>
      </SocialLinksSection>
    </HeaderContainer>
  );
});

export default Header;
