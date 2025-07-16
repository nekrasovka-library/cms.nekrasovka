import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  @media (min-width: 769px) {
    padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
    padding-bottom: ${({ $paddingBottom }) =>
      $paddingBottom ? `${$paddingBottom}` : "0"};
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const FooterComponent = styled.div`
  display: flex;
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;

  @media (min-width: 769px) {
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 25px;
  }
`;

const LogoSection = styled.section`
  display: flex;
  align-items: center;
  column-gap: 35px;

  @media (max-width: 768px) {
    justify-content: space-between;
    order: 2;

    svg {
      height: 40px;
    }

    a:nth-child(1) {
      svg {
        width: 114px;
      }
    }

    a:nth-child(2) {
      svg {
        width: 144px;
      }
    }
  }
`;

const NavSection = styled.section`
  display: flex;

  @media (min-width: 769px) {
    font-size: 14px;
    column-gap: 50px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    flex-direction: column;
    row-gap: 15px;
    order: 1;
  }
`;

const NavLink = styled.a`
  cursor: pointer;
  color: #346178;
  text-decoration: none;
`;

const OrganizationLink = styled(NavLink)`
  @media (min-width: 769px) {
    max-width: 250px;
  }
`;

const QuestionButton = styled.button`
  @media (min-width: 769px) {
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
  }

  @media (max-width: 768px) {
    display: none;
  }
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
