import axios from 'axios';
import { useQuery } from 'react-query';
import API_BASE_URL from '../config';
import authHeaders from "../utils/axios-request-header";


export default function useBooksApi() {

  const getAllBooks = axios.get(`${API_BASE_URL}/books`, authHeaders) 

    return useQuery('books', () => getAllBooks);
}

