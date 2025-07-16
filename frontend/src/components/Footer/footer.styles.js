import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const FooterComponent = styled.div`
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

const NavSection = styled.section`
  display: flex;
  column-gap: 50px;
  font-size: 14px;
`;

const NavLink = styled.a`
  cursor: pointer;
  color: #346178;
  text-decoration: none;
`;

const OrganizationLink = styled(NavLink)`
  max-width: 250px;
`;

const QuestionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  padding: 0 15px;
  height: 40px;
  background: #5d4a96;
  border-radius: 5px;
  color: #edeee9;
  font-size: 14px;
  cursor: pointer;
  border: none;
`;

export {
  FooterContainer,
  FooterComponent,
  QuestionButton,
  LogoSection,
  NavLink,
  NavSection,
  OrganizationLink,
};
