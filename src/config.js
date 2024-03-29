import axios from 'axios';
import { loadAuthToken } from './utils/local-storage';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const configuration = config;
  const authToken = loadAuthToken();
  const {
    booksItemCount,
    listsItemCount,
    pageNumber,
    sortBy,
    listIds,
    query,
  } = config;

  configuration.headers.Authorization = authToken
    ? `Bearer ${authToken}`
    : null;
  configuration.params = {
    ...config.params,
    booksItemCount,
    listsItemCount,
    pageNumber,
    sortBy,
    listIds,
    query,
  };
  return configuration;
});

export default api;
