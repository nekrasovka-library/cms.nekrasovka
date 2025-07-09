import styled from "styled-components";

const AfishaContainer = styled.div`
  position: relative;

  button {
    cursor: pointer;
    position: absolute;
    top: calc(50% - 20px);
    right: -20px;
    z-index: 100;
  }
`;

const AfishaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  span {
    color: #346178;
  }

  > span {
    font-size: 24px;
    font-weight: 500;
  }

  > a span {
    font-size: 14px;
  }

  > a svg {
    margin-left: 5px;
  }
`;

const EventsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${({ $tracks }) => $tracks},
    minmax(386px, 1fr)
  );
  column-gap: ${({ $gap }) => $gap}px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export { EventsContainer, AfishaContainer, AfishaHeader };
