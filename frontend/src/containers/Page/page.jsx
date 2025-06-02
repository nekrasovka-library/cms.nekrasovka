import React, { useEffect } from "react";
import Preview from "../Preview/preview.jsx";
import Constructor from "../Constructor/constructor.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { BackToConstructorButton } from "./page.styles.js";

const Page = () => {
  const dispatch = useDispatch();
  const { pageId, projectId } = useParams();
  const { isPreview } = useSelector((state) => state.preview);
  const { pageData, isPageLoaded } = useSelector((state) => state.page);
  const { isProjectLoaded } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch({ type: "GET_PROJECT_PAGE_REQUEST", pageId });

    return () => {
      dispatch({ type: "RESET_PROJECT_PAGE" });
      dispatch({ type: "RESET_BLOCKS" });
    };
  }, [pageId]);

  useEffect(() => {
    if (isPageLoaded) {
      dispatch({ type: "GET_BLOCKS_SUCCESS", payload: pageData.blocks });

      if (projectId !== pageData.projectId && !isProjectLoaded) {
        dispatch({ type: "GET_PROJECT_REQUEST", projectId });
      }
    }
  }, [isPageLoaded]);

  return isPreview ? (
    <>
      <Preview />
      <BackToConstructorButton
        type="button"
        onClick={() => dispatch({ type: "TOGGLE_PREVIEW" })}
      >
        <span>Вернуться к редактированию</span>
      </BackToConstructorButton>
    </>
  ) : (
    <Constructor />
  );
};

export default Page;
