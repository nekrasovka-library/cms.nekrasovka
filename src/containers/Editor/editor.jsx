import React, { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Container } from "./editor.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { TOOLBAR_OPTIONS, FONT_SIZE_ARRAY } from "./editor.constants.js";

const QuillSizeAttr = Quill.import("attributors/style/size");
QuillSizeAttr.whitelist = FONT_SIZE_ARRAY;
Quill.register(QuillSizeAttr, true);

const initializeQuill = (
  editorRef,
  text,
  dispatch,
  blockIndex,
  elementIndex,
) => {
  const quill = new Quill(editorRef.current, {
    theme: "snow",
    modules: { toolbar: TOOLBAR_OPTIONS },
    readOnly: true,
  });
  quill.clipboard.dangerouslyPasteHTML(text); // Initialize content
  quill.enable(true);
  quill.on("text-change", () => {
    dispatch({
      type: "UPDATE_BLOCK",
      payload: { blockIndex, elementIndex, text: quill.root.innerHTML },
    });
  });

  return quill;
};

const Editor = ({
  text,
  blockIndex,
  elementIndex,
  setEditorFocused,
  isEditorFocused,
}) => {
  const editorRef = useRef(null);
  const { isMenuOpen } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    const quill = initializeQuill(
      editorRef,
      text,
      dispatch,
      blockIndex,
      elementIndex,
    );

    return () => quill.off("text-change");
  }, []);

  const handleEditorFocused = () => {
    setEditorFocused(`${blockIndex}-${elementIndex}`);
  };

  return (
    <Container $isEditorFocused={isEditorFocused} $isMenuOpen={isMenuOpen}>
      <div ref={editorRef} onClick={handleEditorFocused} />
    </Container>
  );
};

export default Editor;
