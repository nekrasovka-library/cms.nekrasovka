import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  @media (min-width: 769px) {
    padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
    padding-bottom: ${({ $paddingBottom }) =>
      $paddingBottom ? `${$paddingBottom}` : "0"};
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const HeaderComponent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    row-gap: 15px;
  }
`;

const LogoSection = styled.section`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    a:nth-child(2) {
      display: none;
    }

    svg {
      height: 40px;
      width: 114px;
    }
  }
`;

const MobileIconSection = styled.section`
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
    column-gap: 25px;
    align-items: center;
  }
`;

const WorkingHoursSection = styled.section`
  display: flex;
  align-items: center;
  column-gap: 10px;

  @media (max-width: 768px) {
    background: #ffffff;
    border-radius: 5px;
    padding: 5px;
    width: 100%;
  }
`;

const ClockIcon = styled.img`
  height: 30px;
`;

const WorkingHoursInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusText = styled.span`
  color: #346178;
  font-size: 14px;
`;

const AddressLink = styled.a`
  display: flex;
  align-items: center;
  column-gap: 5px;
  color: #777777;
  font-size: 13px;
  text-decoration: none;
`;

const SocialLinksSection = styled.section`
  @media (min-width: 769px) {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export {
  HeaderContainer,
  LogoSection,
  WorkingHoursSection,
  ClockIcon,
  WorkingHoursInfo,
  StatusText,
  AddressLink,
  SocialLinksSection,
  HeaderComponent,
  MobileIconSection,
};
