import axios from 'axios'
import { loadAuthToken } from "./utils/local-storage";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const configuration = config;
const authToken = loadAuthToken()
  configuration.headers.Authorization =  authToken ? `Bearer ${authToken}` : null;
  configuration.params = {...config.params, itemCount :config.itemCount, pageNumber: config.pageNumber}
console.log('configuration', configuration)
  return configuration;
});

export default api