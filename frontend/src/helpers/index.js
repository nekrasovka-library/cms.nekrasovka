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

const getComponentParams = ({ text, type, blockId, styles }) => {
  if (type === "text") {
    return {
      blockId,
      text,
      textAlign: styles.textAlign,
      gap: styles.gap,
      tracks: styles.tracks,
      backgroundColor: styles.backgroundColor,
      maxWidth: calculateBlockWidth(styles.maxWidth),
      paddingTop: styles.paddingTop,
      paddingBottom: styles.paddingBottom,
    };
  }

  if (type === "image") {
    return {
      blockId,
      text,
      borderRadius: styles.borderRadius,
      height: styles.height,
      maxWidth: calculateBlockWidth(styles.maxWidth),
      paddingTop: styles.paddingTop,
      paddingBottom: styles.paddingBottom,
      backgroundColor: styles.backgroundColor,
    };
  }

  if (type === "carousel") {
    return {
      blockId,
      text,
      borderRadius: styles.borderRadius,
      tracks: styles.tracks,
      height: styles.height,
      maxWidth: calculateBlockWidth(styles.maxWidth),
      paddingTop: styles.paddingTop,
      paddingBottom: styles.paddingBottom,
      backgroundColor: styles.backgroundColor,
    };
  }

  if (type === "divider") {
    return {
      blockId,
      text,
      color: styles.color,
      opacity: styles.opacity,
      maxWidth: calculateBlockWidth(styles.maxWidth),
      paddingTop: styles.paddingTop,
      paddingBottom: styles.paddingBottom,
      backgroundColor: styles.backgroundColor,
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
      maxWidth: calculateBlockWidth(styles.maxWidth),
      paddingTop: styles.paddingTop,
      paddingBottom: styles.paddingBottom,
      elementBackgroundColor: styles.elementBackgroundColor,
      elementFontSize: styles.elementFontSize,
      backgroundColor: styles.backgroundColor,
    };
  }

  if (type === "header") {
    return {
      blockId,
      text,
      backgroundColor: styles.backgroundColor,
      maxWidth: calculateBlockWidth(styles.maxWidth),
      paddingTop: styles.paddingTop,
      paddingBottom: styles.paddingBottom,
    };
  }

  if (type === "footer") {
    return {
      blockId,
      text,
      backgroundColor: styles.backgroundColor,
      maxWidth: calculateBlockWidth(styles.maxWidth),
      paddingTop: styles.paddingTop,
      paddingBottom: styles.paddingBottom,
    };
  }

  if (["afishaPage", "afishaMain"].includes(type)) {
    return {
      blockId,
      text,
      backgroundColor: styles.backgroundColor,
      gap: styles.gap,
      tracks: styles.tracks,
      maxWidth: calculateBlockWidth(styles.maxWidth),
      paddingTop: styles.paddingTop,
      paddingBottom: styles.paddingBottom,
    };
  }

  return {};
};

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export {
  useIsMobile,
  calculateBlockWidth,
  getComponentParams,
  generateUniqueId,
};
