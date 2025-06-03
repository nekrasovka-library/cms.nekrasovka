import React, { useEffect, useRef, useCallback } from "react";
import Preview from "../Preview/preview.jsx";
import Constructor from "../Constructor/constructor.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { BackToConstructorButton } from "./page.styles.js";

const GET_BLOCKS_SUCCESS = "GET_BLOCKS_SUCCESS";
const RESET_BLOCKS = "RESET_BLOCKS";
const RESET_PROJECT_PAGE = "RESET_PROJECT_PAGE";
const GET_PROJECT_PAGE_REQUEST = "GET_PROJECT_PAGE_REQUEST";
const GET_PROJECT_REQUEST = "GET_PROJECT_REQUEST";
const TOGGLE_PREVIEW = "TOGGLE_PREVIEW";

const Page = () => {
  const dispatch = useDispatch();
  const { pageId, projectId } = useParams();
  const { isPreview } = useSelector((state) => state.preview);
  const { pageData, isPageLoaded } = useSelector((state) => state.page);
  const { isProjectLoaded } = useSelector((state) => state.project);

  // Ref для отслеживания, был ли уже отправлен запрос на блоки
  const blocksFetched = useRef(false);
  // Ref для хранения предыдущего pageId
  const prevPageIdRef = useRef(null);

  const togglePreview = useCallback(() => {
    dispatch({ type: TOGGLE_PREVIEW });
  }, [dispatch]);

  // Загрузка данных страницы только если pageId изменился
  useEffect(() => {
    // Отправляем запрос только если pageId изменился
    if (prevPageIdRef.current !== pageId) {
      dispatch({ type: GET_PROJECT_PAGE_REQUEST, pageId });
      prevPageIdRef.current = pageId;
    }

    return () => {
      dispatch({ type: RESET_PROJECT_PAGE });
      dispatch({ type: RESET_BLOCKS });
      blocksFetched.current = false;
    };
  }, [pageId, dispatch]);

  // Обработка загруженных данных страницы
  useEffect(() => {
    // Проверяем, что страница загружена и блоки еще не были запрошены
    if (isPageLoaded && !blocksFetched.current && pageData?.blocks) {
      dispatch({ type: GET_BLOCKS_SUCCESS, payload: pageData.blocks });
      blocksFetched.current = true;

      // Проверяем, нужно ли загружать проект
      if (
        projectId &&
        pageData.projectId &&
        projectId !== pageData.projectId &&
        !isProjectLoaded
      ) {
        dispatch({ type: GET_PROJECT_REQUEST, projectId });
      }
    }
  }, [isPageLoaded, pageData, projectId, isProjectLoaded, dispatch]);

  return isPreview ? (
    <>
      <Preview />
      <BackToConstructorButton type="button" onClick={togglePreview}>
        <span>Вернуться к редактированию</span>
      </BackToConstructorButton>
    </>
  ) : (
    <Constructor />
  );
};

export default Page;
