import React, { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Container } from "./editor.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { TOOLBAR_OPTIONS, FONT_SIZE_ARRAY } from "./editor.constants.js";
import { FontStyle } from "quill/formats/font";

const QuillSizeAttr = Quill.import("attributors/style/size");
const AlignStyle = Quill.import("attributors/style/align");
const Block = Quill.import("blots/block");

QuillSizeAttr.whitelist = FONT_SIZE_ARRAY;
Quill.register(QuillSizeAttr, true);
Quill.register(AlignStyle, true);
Quill.register(FontStyle, true);
Block.tagName = "div";
Quill.register(Block, true);

const initializeQuill = (editorRef, text, dispatch, itemId, blockId) => {
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
      payload: { blockId, itemId, text: quill.root.innerHTML },
    });
  });

  return quill;
};

const Editor = ({
  text,
  itemId,
  blockId,
  setEditorFocused,
  isEditorFocused,
}) => {
  const editorRef = useRef(null);
  const { isMenuOpen } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    const quill = initializeQuill(editorRef, text, dispatch, itemId, blockId);

    return () => quill.off("text-change");
  }, []);

  const handleEditorFocused = () => {
    setEditorFocused(`${blockId}-${itemId}`);
  };

  return (
    <Container $isEditorFocused={isEditorFocused} $isMenuOpen={isMenuOpen}>
      <div id="ed-1s" ref={editorRef} onClick={handleEditorFocused} />
    </Container>
  );
};

export default Editor;
