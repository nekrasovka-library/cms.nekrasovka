import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 700) => {
  // Если "window" недоступен (SSR), считается, что ширина неизвестна. Начальное значение false.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= breakpoint;
    }
    return false;
  });

  useEffect(() => {
    // Для серверных условий `window` недоступен: пропускаем хук.
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth <= breakpoint;
      setIsMobile((prevIsMobile) =>
        prevIsMobile !== isCurrentlyMobile ? isCurrentlyMobile : prevIsMobile,
      );
    };

    // Вызов обработчика при монтировании компонента (для синхронизации)
    handleResize();

    // Добавление слушателя события
    window.addEventListener("resize", handleResize);

    // Удаление слушателя при размонтировании компонента
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const calculateBlockWidth = (columns) => {
  const MIN_WIDTH = 60;
  const MAX_WIDTH = 1200;
  const COLUMN_BASE_WIDTH = (MAX_WIDTH - MIN_WIDTH) / 11;
  return MIN_WIDTH + COLUMN_BASE_WIDTH * (columns - 1);
};

const generateBlockStyles = ({
  maxWidth,
  backgroundColor,
  paddingTop,
  paddingBottom,
}) => {
  const computedMaxWidth = maxWidth ? calculateBlockWidth(maxWidth) : 0;

  return `
  width: 100%; 
  & {
    background-color: ${backgroundColor} !important;
  } 
  > div {
    margin: 0 auto; 
    max-width: ${computedMaxWidth}px; 
    padding-top: ${paddingTop}; 
    padding-bottom: ${paddingBottom}; 
  }`;
};

const getComponentParams = ({ text, type, blockId, styles }) => {
  if (type === "text") {
    return {
      blockId,
      text,
      backgroundColor: styles.backgroundColor,
      textAlign: styles.textAlign,
      gap: styles.gap,
      tracks: styles.tracks,
    };
  }

  if (type === "image") {
    return {
      blockId,
      text,
      borderRadius: styles.borderRadius,
      height: styles.height,
    };
  }

  if (type === "carousel") {
    return {
      blockId,
      children: text,
      maxWidth: calculateBlockWidth(styles.maxWidth),
      borderRadius: styles.borderRadius,
      tracks: styles.tracks,
      height: styles.height,
    };
  }

  if (type === "divider") {
    return {
      blockId,
      text,
      color: styles.color,
      opacity: styles.opacity,
    };
  }

  if (type === "button") {
    return {
      blockId,
      text,
      color: styles.color,
      border: styles.border,
      borderRadius: styles.borderRadius,
      height: styles.height,
      textAlign: styles.textAlign,
      backgroundColor: styles.elementBackgroundColor,
    };
  }

  if (type === "header") {
    return {
      blockId,
      text,
      backgroundColor: styles.elementBackgroundColor,
    };
  }

  if (type === "footer") {
    return {
      blockId,
      text,
      backgroundColor: styles.elementBackgroundColor,
    };
  }

  if (type === "afisha") {
    return {
      blockId,
      text,
      backgroundColor: styles.elementBackgroundColor,
      gap: styles.gap,
      tracks: styles.tracks,
    };
  }

  return {};
};

export {
  useIsMobile,
  generateBlockStyles,
  calculateBlockWidth,
  getComponentParams,
};
