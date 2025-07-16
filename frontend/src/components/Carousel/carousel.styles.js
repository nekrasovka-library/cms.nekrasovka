import styled from "styled-components";

const calculateTotalWidth = ({ $gap, $overhang }) => $gap * 2 + $overhang * 2;
const calculateTotalMargin = ({ $gap, $overhang }) => $gap + $overhang;

const CarouselContainer = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const CarouselComponent = styled.div`
  position: relative;
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;

  @media (min-width: 769px) {
    column-gap: ${({ $gap }) => $gap}px;
    transition: transform 0.4s ease-in-out;
    transform: ${({ $offset }) => `translateX(-${$offset}px)`};
  }

  @media (max-width: 768px) {
    column-gap: 15px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
`;

const CarouselItem = styled.div`
  @media (min-width: 769px) {
    flex: 0 0 calc(100% - ${calculateTotalWidth}px);

    &:first-child {
      margin-left: ${calculateTotalMargin}px;
    }

    &:last-child {
      margin-right: ${calculateTotalMargin}px;
    }
  }

  @media (max-width: 768px) {
    img {
      width: 248px;
      height: 248px;
    }
  }
`;

const DotContainer = styled.div`
  @media (min-width: 769px) {
    display: flex;
    justify-content: center;
    column-gap: 5px;
    margin-top: 15px;
    position: absolute;
    right: 30px;
    bottom: 30px;
  }

  @media (max-width: 768px) {
    display: none;
  }
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
  @media (min-width: 769px) {
    position: absolute;
    top: calc(50% - 20px);
    z-index: 100;
  }

  @media (max-width: 768px) {
    display: none;
  }
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
  CarouselComponent,
};
