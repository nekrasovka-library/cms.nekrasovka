import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import configureAppStore from "./features/store.js";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router";

const preloadedState = window.__PRELOADED_STATE__; // Получаем состояние, встроенное сервером
delete window.__PRELOADED_STATE__; // Удаляем это свойство после использования (для безопасности)

const store = configureAppStore(preloadedState); // Передаём состояние в store
const root = document.getElementById("root");

createRoot(root).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
