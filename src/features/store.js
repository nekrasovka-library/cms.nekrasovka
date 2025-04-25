import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers"; // Импорт всех редьюсеров
import rootSaga from "./sagas"; // Главная сага

const sagaMiddleware = createSagaMiddleware();

const configureAppStore = (preloadedState = {}) => {
  const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState, // Начальное состояние, загруженное во время SSR
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools,
  });

  // Привязываем task для saga
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default configureAppStore;
