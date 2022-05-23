import axios from 'axios'
import { loadAuthToken } from "./utils/local-storage";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${loadAuthToken()}`,
    }
})

export default api