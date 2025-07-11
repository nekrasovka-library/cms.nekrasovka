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

const fetchFontsApi = async (projectId) => {
  return await axios.get(`${process.env.REACT_APP_API}fonts`);
};

const fetchProjectApi = async (projectId) => {
  return await axios.get(`${process.env.REACT_APP_API}projects/${projectId}`);
};

const fetchProjectPageApi = async ({ pageId }) => {
  return await axios.get(`${process.env.REACT_APP_API}page/${pageId}`);
};

const fetchProjectsApi = async () => {
  return await axios.get(`${process.env.REACT_APP_API}projects`);
};

const fetchCreateProjectApi = async (project) => {
  return await axios.put(`${process.env.REACT_APP_API}projects/create`, {
    project,
  });
};

const fetchCreateProjectPageApi = async (params) => {
  return await axios.put(`${process.env.REACT_APP_API}page/create`, params);
};

const fetchDeleteProjectPageApi = async ({ projectId, pageId }) => {
  return await axios.post(`${process.env.REACT_APP_API}page/delete`, {
    projectId,
    pageId,
  });
};

const fetchUpdateProjectPageApi = async (params) => {
  return await axios.post(`${process.env.REACT_APP_API}page/update`, params);
};

const fetchUpdateProjectApi = async (params) => {
  return await axios.post(
    `${process.env.REACT_APP_API}projects/update`,
    params,
  );
};

export {
  fetchProjectApi,
  fetchProjectsApi,
  fetchCreateProjectApi,
  fetchCreateProjectPageApi,
  fetchDeleteProjectPageApi,
  fetchProjectPageApi,
  fetchUpdateProjectPageApi,
  fetchUpdateProjectApi,
  fetchFontsApi,
};
