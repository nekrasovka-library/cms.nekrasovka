import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Container } from "./editor.styles.js";

const FONT_SIZE_ARR = [
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
  "30px",
  "32px",
  "34px",
  "36px",
  "38px",
  "40px",
  "42px",
  "46px",
  "52px",
  "62px",
  "72px",
  "82px",
  "92px",
  "102px",
];

const Editor = ({ isMenuOpen }) => {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [isEditorFocused, setIsEditorFocused] = useState(false);

  const Size = Quill.import("attributors/style/size");
  Size.whitelist = FONT_SIZE_ARR;
  Quill.register(Size, true);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: FONT_SIZE_ARR }],
    [{ color: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
  ];

  useEffect(() => {
    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });

    // Событие на изменение содержимого редактора
    quill.on("text-change", () => {
      setEditorContent(quill.root.innerHTML); // Сохраняем содержимое редактора
    });

    return () => {
      quill.off();
    };
  }, []);

  return (
    <Container
      $isEditorFocused={isEditorFocused}
      $isMenuOpen={isMenuOpen}
      onBlur={() => setIsEditorFocused(false)}
    >
      <div ref={editorRef} onClick={() => setIsEditorFocused(true)} />
    </Container>
  );
};

export default Editor;
