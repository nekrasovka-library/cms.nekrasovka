import React, { useEffect, useRef } from "react";
import { AfishaContainer } from "./afisha.styles";

const Afisha = ({ blockId, text, gap, tracks }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Загружаем CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${process.env.REACT_APP_URL}files/afisha.css`;
    document.head.appendChild(link);

    // Загружаем и выполняем JavaScript
    const script = document.createElement("script");
    script.src = `${process.env.REACT_APP_URL}files/afisha.js`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Очистка при размонтировании
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  // Обновляем innerHTML только при изменении text
  useEffect(() => {
    if (containerRef.current && text) {
      containerRef.current.innerHTML = text;
    }
  }, [text]);

  return (
    <AfishaContainer $tracks={tracks} $gap={gap}>
      <div ref={containerRef} />
    </AfishaContainer>
  );
};

export default Afisha;
