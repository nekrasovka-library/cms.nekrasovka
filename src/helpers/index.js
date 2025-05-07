import { useState, useEffect } from "react";

const useWindowDimensions = () => {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};

const copyToClipboard = async (text) => {
  let isCopied;

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      isCopied = true;
    } catch (err) {
      console.error("Ошибка при копировании подписи: ", err);
      isCopied = false;
    }
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      isCopied = true;
    } catch (err) {
      console.error("Ошибка при копировании подписи через execCommand: ", err);
      isCopied = false;
    }

    document.body.removeChild(textarea);
  }

  return isCopied;
};

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
  const MAX_WIDTH = 1160;
  const COLUMN_BASE_WIDTH = (MAX_WIDTH - MIN_WIDTH) / 11;
  return MIN_WIDTH + COLUMN_BASE_WIDTH * (columns - 1);
};

const generateBlockStyles = (
  {
    maxWidth,
    backgroundColor,
    paddingTop,
    paddingBottom,
    textAlign,
    borderRadius,
  },
  id,
) => {
  const computedMaxWidth = maxWidth ? calculateBlockWidth(maxWidth) : 0;
  const computedBorderRadius = borderRadius
    ? `img {border-radius: ${borderRadius}px;width: 100%;}`
    : "";

  return `
    .dynamic-preview-${id} {
      width: 100%; 
      background-color: ${backgroundColor};
    }
   
    .dynamic-preview-${id} > div {
      margin: 0 auto;
      max-width: ${computedMaxWidth}px;
      padding-top: ${paddingTop};
      padding-bottom: ${paddingBottom};
      text-align: ${textAlign};
      ${computedBorderRadius};
    }
  `;
};

export {
  useWindowDimensions,
  copyToClipboard,
  useIsMobile,
  generateBlockStyles,
  calculateBlockWidth,
};
