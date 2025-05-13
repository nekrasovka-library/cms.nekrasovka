import React, { useState, useEffect, useRef } from "react";
import {
  CarouselWrapper,
  CarouselTrack,
  CarouselItem,
  DotContainer,
  Dot,
  ImageFile,
} from "./carousel.styles";
import { useDispatch } from "react-redux";

const Carousel = ({
  children,
  maxWidth = 600,
  autoScrollInterval = 0,
  overhang = 5,
  gap = 10,
  isDots = true,
  blockId,
  itemId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const autoScrollRef = useRef(null);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

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

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileName = file.name;

      dispatch({
        type: "UPDATE_BLOCK",
        payload: {
          blockId,
          itemId,
          text: children.map((child, index) => {
            if (index === currentIndex) {
              return fileName;
            } else {
              return child;
            }
          }),
        },
      });
    }
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
    <CarouselWrapper $maxWidth={maxWidth}>
      <CarouselTrack
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        $offset={offset}
        $gap={gap}
      >
        {children.map((child, index) => {
          return (
            <CarouselItem key={index} $gap={gap} $overhang={overhang}>
              <img src={child} alt="картинка" onClick={handleFileClick} />
              <ImageFile
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </CarouselItem>
          );
        })}
      </CarouselTrack>
      {isDots && (
        <DotContainer $gap={gap} $overhang={overhang}>
          {children.map((_, index) => (
            <Dot
              key={index}
              onClick={() => handleDotClick(index)}
              $isActive={index === currentIndex}
            />
          ))}
        </DotContainer>
      )}
    </CarouselWrapper>
  );
};

export default Carousel;
