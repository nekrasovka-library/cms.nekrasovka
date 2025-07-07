import styled from "styled-components";

const calculateTotalWidth = ({ $gap, $overhang }) => $gap * 2 + $overhang * 2;
const calculateTotalMargin = ({ $gap, $overhang }) => $gap + $overhang;

const CarouselWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  text-align: center;
`;

const CarouselTrack = styled.div`
  display: flex;
  column-gap: ${({ $gap }) => $gap}px;
  transition: transform 0.4s ease-in-out;
  transform: ${({ $offset }) => `translateX(-${$offset}px)`};
`;

const CarouselItem = styled.div`
  flex: 0 0 calc(100% - ${calculateTotalWidth}px);
  height: ${({ $height }) => $height}px;

  img {
    width: calc(100% - ${calculateTotalWidth}px);
    height: 100%;
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    object-fit: cover;
  }

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
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? "#222" : "#c7c7c7")};
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: #222;
    }
  }
`;

export { CarouselWrapper, CarouselTrack, CarouselItem, DotContainer, Dot };
