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

const fetchProjectApi = async (projectId) => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API}projects/${projectId}`,
  );
};

const fetchProjectPageApi = async ({ pageId }) => {
  return await axios.get(`${import.meta.env.VITE_APP_API}page/${pageId}`);
};

const fetchProjectsApi = async () => {
  return await axios.get(`${import.meta.env.VITE_APP_API}projects`);
};

const fetchCreateProjectApi = async (project) => {
  return await axios.put(`${import.meta.env.VITE_APP_API}projects/create`, {
    project,
  });
};

const fetchCreateProjectPageApi = async ({ projectId }) => {
  return await axios.put(`${import.meta.env.VITE_APP_API}page/create`, {
    projectId,
  });
};

const fetchDeleteProjectPageApi = async ({ projectId, pageId }) => {
  return await axios.post(`${import.meta.env.VITE_APP_API}page/delete`, {
    projectId,
    pageId,
  });
};

const fetchUpdateProjectPageApi = async (params) => {
  return await axios.post(`${import.meta.env.VITE_APP_API}page/update`, params);
};

export {
  fetchProjectApi,
  fetchProjectsApi,
  fetchCreateProjectApi,
  fetchCreateProjectPageApi,
  fetchDeleteProjectPageApi,
  fetchProjectPageApi,
  fetchUpdateProjectPageApi,
};
