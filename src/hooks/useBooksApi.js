import axios from 'axios';
import { useQuery } from 'react-query';
import API_BASE_URL from '../config';
import { loadAuthToken } from '../utils/local-storage';

export default function useBooksApi() {

  const getAllBooks = axios.get(`${API_BASE_URL}/books`, {
      headers: {
        Authorization: `Bearer ${loadAuthToken()}`,
      },
    }) 

    return useQuery('getBooks', () => getAllBooks);
}

