import { useQuery, useMutation } from 'react-query';
import api from '../config'
import { loadAuthToken } from '../utils/local-storage';


export default function useGetBooks(booksItemCount, pageNumber, sortBy) {


  const getAllBooks = api.get(`/books`,{booksItemCount, pageNumber, sortBy}) 

    return useQuery('books', () => getAllBooks,{
      enabled: !!loadAuthToken(),
    });
}

export function useGetBooksByList(listIds){
  console.log('listIds',listIds)
  const getAllBooks = api.get(`/booksByList`,{listIds} ) 
  return useQuery('booksByList', () => getAllBooks, {
    enabled: !!listIds
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

