import { useQuery } from 'react-query';
import api from '../config'


export default function useBooksApi() {

  const getAllBooks = api.get(`/books`, ) 

    return useQuery('books', () => getAllBooks);
}

