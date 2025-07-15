import React, { useState, useEffect, useRef } from "react";
import {
  CarouselWrapper,
  CarouselTrack,
  CarouselItem,
  DotContainer,
  Dot,
  CarouselContainer,
  CarouselButtonRight,
  CarouselButtonLeft,
} from "./carousel.styles.js";
import Icon from "../../nekrasovka-ui/Icon/icon";
import Image from "../Image/image";

const DEFAULT_MAX_WIDTH = 600;
const DEFAULT_AUTO_SCROLL = 0;
const DEFAULT_OVERHANG = 0;
const DEFAULT_GAP = 0;
const DEFAULT_BORDER_RADIUS = 0;
const DEFAULT_TRACKS = 3;
const SWIPE_THRESHOLD = 50;

const useCarousel = (itemsCount, autoScrollInterval) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);
  const touchRef = useRef({ isDragging: false, startX: 0 });
  const autoScrollRef = useRef(null);

  const calculateOffset = (index) => {
    const trackWidth = trackRef.current?.offsetWidth || 0;
    const slideWidth = trackWidth - (DEFAULT_GAP + DEFAULT_OVERHANG * 2);
    setOffset(index * slideWidth);
  };

  const navigateToNext = () => {
    setCurrentIndex((prev) => (prev === itemsCount - 1 ? 0 : prev + 1));
  };

  const navigateToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? itemsCount - 1 : prev - 1));
  };

  const handleTouchStart = (event) => {
    touchRef.current = {
      isDragging: true,
      startX: event.touches[0].clientX,
    };
  };

  const handleTouchMove = (event) => {
    if (!touchRef.current.isDragging) return;

    const moveX = event.touches[0].clientX - touchRef.current.startX;
    if (Math.abs(moveX) > SWIPE_THRESHOLD) {
      moveX < 0 ? navigateToNext() : navigateToPrev();
      touchRef.current.isDragging = false;
    }
  };

  useEffect(() => {
    if (autoScrollInterval > 0) {
      autoScrollRef.current = setInterval(navigateToNext, autoScrollInterval);
      return () => clearInterval(autoScrollRef.current);
    }
  }, [autoScrollInterval]);

  useEffect(() => {
    calculateOffset(currentIndex);
  }, [currentIndex]);

  return {
    currentIndex,
    offset,
    trackRef,
    setCurrentIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd: () => (touchRef.current.isDragging = false),
    navigateToNext,
    navigateToPrev,
  };
};

const Carousel = ({
  children,
  maxWidth = DEFAULT_MAX_WIDTH,
  autoScrollInterval = DEFAULT_AUTO_SCROLL,
  overhang = DEFAULT_OVERHANG,
  gap = DEFAULT_GAP,
  blockId,
  borderRadius = DEFAULT_BORDER_RADIUS,
  tracks = DEFAULT_TRACKS,
  height = "550",
}) => {
  const {
    currentIndex,
    offset,
    trackRef,
    setCurrentIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    navigateToNext,
    navigateToPrev,
  } = useCarousel(tracks, autoScrollInterval);

  return (
    <CarouselContainer>
      {currentIndex > 0 && (
        <CarouselButtonLeft>
          <Icon icon="arrowCarousel" type="button" onClick={navigateToPrev} />
        </CarouselButtonLeft>
      )}
      <CarouselWrapper $maxWidth={maxWidth}>
        <CarouselTrack
          ref={trackRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          $offset={offset}
          $gap={gap}
        >
          {Array.from({ length: tracks }).map((_, index) => (
            <CarouselItem key={index} $gap={gap} $overhang={overhang}>
              <Image
                blockId={blockId}
                tracks={tracks}
                text={children[index]}
                imgIndex={index}
                height={height}
                borderRadius={borderRadius}
              />
            </CarouselItem>
          ))}
        </CarouselTrack>
        <DotContainer $gap={gap} $overhang={overhang}>
          {Array.from({ length: tracks }).map((_, index) => (
            <Dot
              key={index}
              onClick={() => setCurrentIndex(index)}
              $isActive={index === currentIndex}
            />
          ))}
        </DotContainer>
      </CarouselWrapper>
      {currentIndex + 1 < tracks && (
        <CarouselButtonRight>
          <Icon icon="arrowCarousel" type="button" onClick={navigateToNext} />
        </CarouselButtonRight>
      )}
    </CarouselContainer>
  );
};

export default Carousel;
