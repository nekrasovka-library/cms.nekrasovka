import React, { useEffect, useRef } from "react";
import { AfishaContainer } from "./afisha.styles";

const Afisha = ({ blockId, text, gap, tracks }) => {
  const containerRef = useRef(null);

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
