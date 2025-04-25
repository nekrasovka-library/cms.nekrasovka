import axios from "axios";

const ax = axios.create({
  headers: {
    "Content-Type": "application/json", // Стандартный Content-Type
  },
});

// Interceptor для обработки запросов
ax.interceptors.request.use(async (config) => {});

// Interceptor для обработки ошибок ответов
ax.interceptors.response.use(
  (response) => response,
  (error) => {},
);

const fetchInitData = async () => {
  return [{ id: 1, title: "test" }];
};

export { fetchInitData };
