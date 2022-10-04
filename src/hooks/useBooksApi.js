import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../config';
import PageContext from '../contexts/page-context';
import ToastContext from '../contexts/toast-context';


export default function useGetBooks() {
  const {booksItemCount, pageNumber, sortBy} = useContext(PageContext);
  const getAllBooks = api.get(`/books`, { booksItemCount, pageNumber, sortBy });
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
  const { setToastFade, setToastStatus, setBook, setToastType } = useContext(ToastContext);
  const queryClient = useQueryClient();
  const { pageNumber } = useContext(PageContext);
  const rateBook = ({ rating, book }) => api.put(`/books/${book.book_id}`, { rating });
  return useMutation(rateBook, {
    onSuccess: (res, args) => {
      const {  book } = args;
      // updating cache
      queryClient.setQueryData(['books', pageNumber], (old) => {
        const oldBookIndex = old.data[0].findIndex(
          (item) => item.book_id === book.book_id,
        );
        old.data[0].splice(oldBookIndex, 1, res.data);
        return old;
      });
         // triggering toast
         setToastStatus('success');
         setToastType('rating');
         setBook(book);
         setToastFade(true);
         setTimeout(() => {
           setToastFade(false);
         }, 2000);
    },
    onError: (err, args) => {
      const { book } = args;
      setToastStatus('error');
      setBook(book);
      setToastFade(true);
      setTimeout(() => {
        setToastFade(false);
      }, 2000);
      console.log('error adding book', err);
    },
  });
}
