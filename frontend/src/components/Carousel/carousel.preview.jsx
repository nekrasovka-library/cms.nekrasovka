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

const DEFAULT_IMAGE = `imgfish.jpg`;

const CarouselConstructor = ({
  children,
  maxWidth = 600,
  autoScrollInterval = 0,
  overhang = 0,
  gap = 0,
  borderRadius = 0,
  tracks,
  height = "550",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const autoScrollRef = useRef(null);

  const calculateOffset = (index) => {
    const trackWidth = trackRef.current?.offsetWidth || 0; // Общая ширина контейнера
    const slideWidth = trackWidth - (gap + overhang * 2); // отступ + сумма ширин выступающих слайдеров
    const offset = index * slideWidth;

    setOffset(offset);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === children.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (event) => {
    isDragging.current = true;
    startX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    if (!isDragging.current) return;

    const moveX = event.touches[0].clientX - startX.current;
    if (Math.abs(moveX) > 50) {
      if (moveX < 0) handleNextClick();
      else handlePrevClick();

      isDragging.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    if (autoScrollInterval > 0) {
      autoScrollRef.current = setInterval(() => {
        handleNextClick();
      }, autoScrollInterval);

      return () => clearInterval(autoScrollRef.current);
    }
  }, [autoScrollInterval]);

  useEffect(() => {
    calculateOffset(currentIndex);
  }, [currentIndex]);

  return (
    <CarouselContainer>
      <CarouselButtonLeft>
        <Icon icon="arrowCarousel" type="button" onClick={() => {}} />
      </CarouselButtonLeft>
      <CarouselWrapper $maxWidth={maxWidth}>
        <CarouselTrack
          ref={trackRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          $offset={offset}
          $gap={gap}
        >
          {Array.from({ length: tracks }).map((_, index) => {
            return (
              <CarouselItem
                key={index}
                $gap={gap}
                $overhang={overhang}
                $borderRadius={borderRadius}
                $height={height}
              >
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}${children[index]}`}
                  alt="картинка"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${process.env.REACT_APP_URL}${DEFAULT_IMAGE}`;
                  }}
                />
              </CarouselItem>
            );
          })}
          <DotContainer $gap={gap} $overhang={overhang}>
            {Array.from({ length: tracks }).map((_, index) => (
              <Dot
                key={index}
                onClick={() => handleDotClick(index)}
                $isActive={index === currentIndex}
              />
            ))}
          </DotContainer>
        </CarouselTrack>
      </CarouselWrapper>
      <CarouselButtonRight>
        <Icon icon="arrowCarousel" type="button" onClick={() => {}} />
      </CarouselButtonRight>
    </CarouselContainer>
  );
};

export default CarouselConstructor;
