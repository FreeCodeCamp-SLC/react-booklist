import { useQuery, useMutation } from 'react-query';
import api from '../config'

export default function useGetBooks(booksItemCount, pageNumber, sortBy) {

  const getAllBooks = api.get(`/books`,{booksItemCount, pageNumber, sortBy}) 

    return useQuery(['books', pageNumber], async () => getAllBooks,{
    });
}

export function useAddBook(history,){
  const addBook = (book)=>  api.post('/books', book);
  return useMutation( addBook, {
    onSuccess: () => {
      history.push('/dashboard');
    },
    onError: (err) => {
    console.log('error adding book', err)
    },
  })

}

