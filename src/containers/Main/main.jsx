import React, { useRef, useState } from "react";
import Block from "../Block/block.jsx";
import { useSelector } from "react-redux";
import { generateBlockStyles } from "../../helpers";

const Main = () => {
  const { blocks, totalBlocks } = useSelector((state) => state.blocks);
  const { isPreview } = useSelector((state) => state.preview);
  const [editorFocused, setEditorFocused] = useState(null);
  const hasBlocks = totalBlocks > 0;
  const exportableRef = useRef(null);

  const handleContainerClick = ({ target }) => {
    if (!target.parentNode?.parentNode?.classList.value?.includes("ql-")) {
      setEditorFocused(null);
    }
  };

  const injectStyles = (styles, id) => {
    const css = generateBlockStyles(styles, id);
    let styleElement = document.querySelector(`#dynamic-style-${id}`);
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = `dynamic-style-${id}`;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  };

  const exportToHTML = () => {
    const element = exportableRef.current;
    if (!element) return;

    const inlineStyles = blocks
      .map(({ id, styles }) => generateBlockStyles(styles, id))
      .join("");
    const htmlContent = `
      <div>
        <style>${inlineStyles}</style>
        ${element.outerHTML}
      </div>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported_page.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderBlocks = (isEditorMode) =>
    blocks.map(({ id, items, styles }, blockIndex) => {
      return isEditorMode ? (
        <Block
          key={id}
          id={id}
          blockIndex={blockIndex}
          items={items}
          styles={styles}
          isItems={!!items}
          editorFocused={editorFocused}
          setEditorFocused={setEditorFocused}
        />
      ) : (
        <div
          key={id}
          className={`dynamic-preview-${id}`}
          dangerouslySetInnerHTML={{
            __html: items.map((item) => item.text),
          }}
        />
      );
    });

  return isPreview ? (
    <div ref={exportableRef}>
      {blocks.forEach(({ id, styles }) => injectStyles(styles, id))}
      {renderBlocks(false)}
    </div>
  ) : (
    <div onClick={handleContainerClick}>
      {hasBlocks ? renderBlocks(true) : <Block blockIndex={0} />}
    </div>
  );
};

export default Main;
