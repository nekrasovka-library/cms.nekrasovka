import React, { useState, useEffect, useRef, Children } from "react";
import {
  CarouselWrapper,
  CarouselTrack,
  CarouselItem,
  DotContainer,
  Dot,
} from "./carousel.styles";

const Carousel = ({
  children,
  maxWidth = 600,
  autoScrollInterval = 0,
  overhang = 5,
  gap = 10,
  isDots = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef();
  const startX = useRef(0);
  const isDragging = useRef(false);
  const autoScrollRef = useRef();

  // Преобразование children в массив
  const childrenArray = Children.toArray(children);

  const calculateOffset = (index) => {
    const trackWidth = trackRef.current?.offsetWidth || 0; // Общая ширина контейнера
    const slideWidth = trackWidth - (gap + overhang * 2); // отступ + сумма ширин выступающих слайдеров
    const offset = index * slideWidth;

    setOffset(offset);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? childrenArray.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === childrenArray.length - 1 ? 0 : prevIndex + 1,
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
    <CarouselWrapper maxWidth={maxWidth}>
      <CarouselTrack
        ref={trackRef}
        offset={offset}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        gap={gap}
      >
        {childrenArray.map((child, index) => (
          <CarouselItem key={index} gap={gap} overhang={overhang}>
            {child}
          </CarouselItem>
        ))}
      </CarouselTrack>
      {isDots && (
        <DotContainer gap={gap} overhang={overhang}>
          {children.map((_, index) => (
            <Dot
              key={index}
              isActive={index === currentIndex}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </DotContainer>
      )}
    </CarouselWrapper>
  );
};

export default Carousel;
