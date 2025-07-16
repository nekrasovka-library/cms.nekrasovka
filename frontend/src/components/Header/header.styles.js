import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const HeaderComponent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;
`;

const LogoSection = styled.section`
  display: flex;
  align-items: center;
  column-gap: 35px;
`;

const WorkingHoursSection = styled.section`
  display: flex;
  align-items: center;
  column-gap: 10px;
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
  display: flex;
  align-items: center;
  column-gap: 10px;
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
};
