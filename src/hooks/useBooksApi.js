import { useQuery, useMutation } from 'react-query';
import api from '../config'
import { loadAuthToken } from '../utils/local-storage';


export default function useBooksApi() {
  const getAllBooks = api.get(`/books`, {pageItems: 6, page: 2}) 
  
    return useQuery('books', () => getAllBooks, {
      enabled: !!loadAuthToken
    });
}

export function useAddBook(history,){

  const addBook = (book)=>  api.post('/books', book);
  

  return useMutation('books', addBook, {
    onSuccess: () => {
      history.push('/dashboard');
    },
    onError: (err) => {
    console.log('error adding book', err)
    },
  })

}

