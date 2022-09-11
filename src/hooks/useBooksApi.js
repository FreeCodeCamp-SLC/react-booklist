import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../config';
import PageContext from '../contexts/page-context';


export default function useGetBooks(booksItemCount, pageNumber, sortBy) {
  const getAllBooks = api.get(`/books`, { booksItemCount, pageNumber, sortBy });
// could also stop passing pageNumber as a param and just use the context
  return useQuery(['books', pageNumber], async () => getAllBooks, {});
}

export function useAddBook(history) {
  const addBook = (book) => api.post('/books', book);
  return useMutation(addBook, {
    onSuccess: () => {
      history.push('/dashboard');
    },
    onError: (err) => {
      console.log('error adding book', err);
    },
  });
}

export function useRateBook() {
  const queryClient = useQueryClient();
  const { pageNumber } = useContext(PageContext);
  const rateBook = ({ rating, id }) => api.put(`/books/${id}`, { rating });
  return useMutation(rateBook, {
    onSuccess: (res, args) => {
      const {  id } = args;
      queryClient.setQueryData(['books', pageNumber], (old) => {
        const oldBookIndex = old.data[0].findIndex(
          (book) => book.book_id === id,
        );
        old.data[0].splice(oldBookIndex, 1, res.data);
        return old;
      });
    },
    onError: (err) => {
      console.log('error adding book', err);
    },
  });
}
