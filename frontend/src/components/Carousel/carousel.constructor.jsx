import React, { useState, useEffect, useRef } from "react";
import {
  CarouselWrapper,
  CarouselTrack,
  CarouselItem,
  DotContainer,
  Dot,
} from "./carousel.styles.js";
import { useDispatch } from "react-redux";
import ImageFile from "../Image/components/image.file.jsx";
import axios from "axios";

const DEFAULT_MAX_WIDTH = 600;
const DEFAULT_AUTO_SCROLL = 0;
const DEFAULT_OVERHANG = 5;
const DEFAULT_GAP = 0;
const DEFAULT_BORDER_RADIUS = 0;
const DEFAULT_TRACKS = 3;
const SWIPE_THRESHOLD = 50;
const DEFAULT_IMAGE = `imgfish.jpg`;

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
  };
};

const CarouselConstructor = ({
  children,
  maxWidth = DEFAULT_MAX_WIDTH,
  autoScrollInterval = DEFAULT_AUTO_SCROLL,
  overhang = DEFAULT_OVERHANG,
  gap = DEFAULT_GAP,
  isDots = true,
  blockId,
  itemId,
  borderRadius = DEFAULT_BORDER_RADIUS,
  tracks = DEFAULT_TRACKS,
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef([]);
  const {
    currentIndex,
    offset,
    trackRef,
    setCurrentIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useCarousel(tracks, autoScrollInterval);

  const handleFileUpdate = async (file, index) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post(
      `${process.env.REACT_APP_API}images/upload`,
      formData,
    );

    dispatch({
      type: "UPDATE_BLOCK",
      payload: {
        blockId,
        itemId,
        text: Array.from({ length: tracks }).map((_, i) =>
          i === index ? response.data.file.filename : children[i] || "",
        ),
      },
    });
  };

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
        {Array.from({ length: tracks }).map((_, index) => (
          <CarouselItem
            key={index}
            $gap={gap}
            $overhang={overhang}
            $borderRadius={borderRadius}
          >
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}${children[index]}`}
              alt="картинка"
              onClick={() => fileInputRef.current[index]?.click()}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${process.env.REACT_APP_URL}${DEFAULT_IMAGE}`;
              }}
            />
            <ImageFile
              ref={(el) => (fileInputRef.current[index] = el)}
              handleFileChange={(e) =>
                handleFileUpdate(e.target.files[0], index)
              }
            />
          </CarouselItem>
        ))}
      </CarouselTrack>
      {isDots && (
        <DotContainer $gap={gap} $overhang={overhang}>
          {Array.from({ length: tracks }).map((_, index) => (
            <Dot
              key={index}
              onClick={() => setCurrentIndex(index)}
              $isActive={index === currentIndex}
            />
          ))}
        </DotContainer>
      )}
    </CarouselWrapper>
  );
};

export default CarouselConstructor;
