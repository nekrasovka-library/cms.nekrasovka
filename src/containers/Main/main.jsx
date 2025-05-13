import React, { useRef } from "react";
import Block from "../Block/block.jsx";
import { useDispatch, useSelector } from "react-redux";
import { generateBlockStyles } from "../../helpers";

const Main = () => {
  const dispatch = useDispatch();
  const { blocks, totalBlocks } = useSelector((state) => state.blocks);
  const { isPreview } = useSelector((state) => state.preview);
  const hasBlocks = totalBlocks > 0;
  const exportableRef = useRef(null);

  const EXCLUDED_CLASSES = ["se-container", "se-btn-module", "se-wrapper"];

  const isExcludedClass = (classList) => {
    return EXCLUDED_CLASSES.some((excludedClass) =>
      classList.value.includes(excludedClass),
    );
  };

  const handleContainerClick = ({ target }) => {
    const containerElement = target.parentNode?.parentNode?.parentNode;

    if (!isExcludedClass(containerElement.classList)) {
      dispatch({ type: "RESET_EDITOR" });
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
