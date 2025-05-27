import React, { useEffect } from "react";
import Preview from "../Preview/preview.jsx";
import Constructor from "../Constructor/constructor.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const Page = () => {
  const dispatch = useDispatch();
  const { pageId, projectId } = useParams();
  const { isPreview } = useSelector((state) => state.preview);
  const { pageData, isPageLoaded } = useSelector((state) => state.page);
  const { isProjectLoaded } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch({ type: "GET_PROJECT_PAGE_REQUEST", projectId, pageId });
    if (!isProjectLoaded) dispatch({ type: "GET_PROJECT_REQUEST", projectId });

    return () => {
      dispatch({ type: "RESET_PROJECT_PAGE" });
      dispatch({ type: "RESET_BLOCKS" });
    };
  }, [pageId]);

  useEffect(() => {
    if (isPageLoaded) {
      dispatch({ type: "GET_BLOCKS", payload: pageData.blocks });
    }
  }, [isPageLoaded]);

  return isPreview ? <Preview /> : <Constructor />;
};

export default Page;
