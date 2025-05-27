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

const fetchProjectFromApi = async (projectId) => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API}projects/${projectId}`,
  );
};

const fetchProjectsFromApi = async () => {
  return await axios.get(`${import.meta.env.VITE_APP_API}projects`);
};

const fetchCreateProjectToApi = async (project) => {
  return await axios.put(`${import.meta.env.VITE_APP_API}projects/create`, {
    project,
  });
};

const fetchCreateProjectPageToApi = async ({ projectId }) => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API}projects/${projectId}/page/create`,
  );
};

const fetchDeleteProjectPageToApi = async ({ projectId, pageId }) => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API}projects/${projectId}/${pageId}/delete`,
  );
};

export {
  fetchProjectFromApi,
  fetchProjectsFromApi,
  fetchCreateProjectToApi,
  fetchCreateProjectPageToApi,
  fetchDeleteProjectPageToApi,
};
