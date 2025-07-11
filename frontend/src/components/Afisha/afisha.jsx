import React, { useEffect, useRef, memo } from "react";

const Afisha = memo(({ text, gap, tracks }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Загружаем CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "//localhost:3013/files/afisha.css";
    document.head.appendChild(link);

    // Загружаем и выполняем JavaScript
    const script = document.createElement("script");
    script.src = "//localhost:3013/files/afisha.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Очистка при размонтировании
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: text }} />;
});

export default Afisha;
