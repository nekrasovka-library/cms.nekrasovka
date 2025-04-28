import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Container } from "./editor.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { TOOLBAR_OPTIONS, FONT_SIZE_ARRAY } from "./editor.constants.js";

// Register font size attribute globally (only once)
const QuillSizeAttr = Quill.import("attributors/style/size");
QuillSizeAttr.whitelist = FONT_SIZE_ARRAY;
Quill.register(QuillSizeAttr, true);

const initializeQuill = (editorRef, text, dispatch, elementIndex) => {
  const quill = new Quill(editorRef.current, {
    theme: "snow",
    modules: { toolbar: TOOLBAR_OPTIONS },
    readOnly: true,
  });
  quill.clipboard.dangerouslyPasteHTML(text); // Initialize content
  quill.enable(true);
  quill.on("text-change", () => {
    dispatch({
      type: "UPD_BLOCK",
      payload: { elementIndex, text: quill.root.innerHTML },
    });
  });
  return quill;
};

const Editor = ({ text, blockIndex, elementIndex }) => {
  const editorRef = useRef(null);
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const { isMenuOpen } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    const quill = initializeQuill(editorRef, text, dispatch, elementIndex);
    return () => quill.off("text-change");
  }, []);

  const handleEditorFocus = () => {
    dispatch({ type: "SET_BLOCK", payload: { blockIndex } });
    setIsEditorFocused(true);
  };

  const handleEditorBlur = () => {
    dispatch({ type: "SET_BLOCK", payload: { blockIndex: null } });
    setIsEditorFocused(false);
  };

  return (
    <Container
      $isEditorFocused={isEditorFocused}
      $isMenuOpen={isMenuOpen}
      onBlur={handleEditorBlur}
    >
      <div ref={editorRef} onClick={handleEditorFocus} />
    </Container>
  );
};

export default Editor;
