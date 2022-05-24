import { useQuery, useMutation } from 'react-query';
import api from '../config'


export default function useBooksApi() {
  const getAllBooks = api.get(`/books`) 
  
    return useQuery('books', () => getAllBooks);
}

export function useAddBook(history){
  const addBook = (book)=> api.post('/books', book)

  return useMutation('books', addBook, {
    onSuccess: () => {
      history.push('/dashboard');
    },
    onError: (err) => {
    console.log('error adding book', err)
    },
  })

}

