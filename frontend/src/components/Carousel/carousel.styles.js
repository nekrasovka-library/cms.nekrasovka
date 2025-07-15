import styled from "styled-components";

const calculateTotalWidth = ({ $gap, $overhang }) => $gap * 2 + $overhang * 2;
const calculateTotalMargin = ({ $gap, $overhang }) => $gap + $overhang;

const CarouselWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  text-align: center;
  position: relative;
`;

const CarouselContainer = styled.div`
  position: relative;
`;

const CarouselTrack = styled.div`
  display: flex;
  column-gap: ${({ $gap }) => $gap}px;
  transition: transform 0.4s ease-in-out;
  transform: ${({ $offset }) => `translateX(-${$offset}px)`};
`;

const CarouselItem = styled.div`
  flex: 0 0 calc(100% - ${calculateTotalWidth}px);

  &:first-child {
    margin-left: ${calculateTotalMargin}px;
  }

  &:last-child {
    margin-right: ${calculateTotalMargin}px;
  }
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 5px;
  margin-top: 15px;
  position: absolute;
  right: 30px;
  bottom: 30px;
`;

const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? "#346178" : "#EDEEE9")};
  ${({ $isActive }) => !$isActive && "border: 2px solid #346178;"};
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: #346178;
      border: none;
    }
  }
`;

const CarouselButton = styled.div`
  position: absolute;
  top: calc(50% - 20px);
  z-index: 100;
`;

const CarouselButtonLeft = styled(CarouselButton)`
  left: -20px;

  svg {
    transform: rotate(180deg);
  }
`;

const CarouselButtonRight = styled(CarouselButton)`
  right: -20px;
`;

export {
  CarouselWrapper,
  CarouselTrack,
  CarouselItem,
  DotContainer,
  Dot,
  CarouselButtonLeft,
  CarouselButtonRight,
  CarouselContainer,
};
