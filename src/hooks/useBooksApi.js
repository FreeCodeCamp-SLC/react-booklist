import axios from 'axios';
import { useQuery } from 'react-query';
import API_BASE_URL from "../config";
import { loadAuthToken } from "../utils/local-storage";



const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
      Authorization: `Bearer ${loadAuthToken()}`,
  }
})

export default function useBooksApi() {

  const getAllBooks = api.get(`/books`, ) 

    return useQuery('books', () => getAllBooks);
}

