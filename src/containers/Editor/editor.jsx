import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Container } from "./editor.styles.js";
import { useDispatch, useSelector } from "react-redux";

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

const Editor = ({ text, blockIndex, elementIndex }) => {
  const editorRef = useRef(null);
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const { isMenuOpen } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const Size = Quill.import("attributors/style/size");
  Size.whitelist = FONT_SIZE_ARR;
  Quill.register(Size, true);

  const toolbar = [
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

  const options = {
    theme: "snow",
    modules: { toolbar },
    readOnly: true,
  };

  useEffect(() => {
    const quill = new Quill(editorRef.current, options);

    quill.clipboard.dangerouslyPasteHTML(text);
    quill.enable(true); // Снова включаем активность

    quill.on("text-change", () => {
      dispatch({
        type: "UPD_BLOCK",
        payload: { elementIndex, text: quill.root.innerHTML },
      });
    });

    return () => quill.off();
  }, []);

  const handleActive = () => {
    dispatch({ type: "SET_BLOCK", payload: { blockIndex } });
    setIsEditorFocused(true);
  };

  return (
    <Container
      $isEditorFocused={isEditorFocused}
      $isMenuOpen={isMenuOpen}
      onBlur={() => setIsEditorFocused(false)}
    >
      <div ref={editorRef} onClick={handleActive} />
    </Container>
  );
};

export default Editor;
