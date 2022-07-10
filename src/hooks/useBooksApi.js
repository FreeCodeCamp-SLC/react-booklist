import { useQuery, useMutation } from 'react-query';
import api from '../config'
import { loadAuthToken } from '../utils/local-storage';


export default function useBooksApi(itemCount, pageNumber, sortBy) {

  const getAllBooks = api.get(`/books`, {itemCount, pageNumber, sortBy}) 
  // const getAllBooks = api.get(`/books`,) 

    return useQuery('books', () => getAllBooks, {
      enabled: !!loadAuthToken,
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

