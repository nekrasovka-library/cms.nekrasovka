import styled from "styled-components";

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth}px;
`;

const CarouselTrack = styled.div`
  display: flex;
  column-gap: ${({ gap }) => gap}px; /* Расстояние между слайдами */
  transition: transform 0.4s ease-in-out;
  transform: ${({ offset }) => `translateX(-${offset}px)`};
`;

const CarouselItem = styled.div`
  box-sizing: border-box;
  flex: 0 0 calc(100% - ${({ overhang, gap }) => gap * 2 + overhang * 2}px);
  max-width: calc(100% - ${({ overhang, gap }) => gap * 2 + overhang * 2}px);

  &:first-child {
    margin-left: ${({ overhang, gap }) => gap + overhang}px;
  }

  &:last-child {
    margin-right: ${({ overhang, gap }) => gap + overhang}px;
  }
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 5px;
  position: absolute;
  z-index: 1;
  bottom: 30px;
  right: ${({ overhang, gap }) => gap + overhang + 30}px;
`;

const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "#346178" : "#ffffff")};
  transition: background-color 0.2s ease-in-out;
  border: 2px solid #346178;
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      background-color: #346178;
    }
  }
`;

export { CarouselWrapper, CarouselTrack, CarouselItem, DotContainer, Dot };
