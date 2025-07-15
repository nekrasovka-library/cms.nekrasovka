import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoSection = styled.section`
  display: flex;
  align-items: center;
  column-gap: 35px;
`;

const Logo = styled.img`
  height: 50px;
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

const SocialIcon = styled.img`
  height: 30px;
`;

export {
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
};
