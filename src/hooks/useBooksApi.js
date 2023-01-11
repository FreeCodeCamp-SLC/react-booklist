import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import api from '../config';
import PageContext from '../contexts/page-context';
import ToastContext from '../contexts/toast-context';

export default function useGetBooks() {
  const history = useHistory();

  const { booksItemCount, pageNumber, sortBy } = useContext(PageContext);
  const getAllBooks = api.get(`/books`, { booksItemCount, pageNumber, sortBy });
  return useQuery(['books', pageNumber], async () => getAllBooks, {
    onError: (error) => {
      if (error.response.status === 401) {
        history.push('/Auth');
      }
    },
    retry: 1,
  });
}

export function useAddBook() {
  const history = useHistory();
  const { setToast } = useContext(ToastContext);

  const addBook = (book) => api.post('/books', book);

  return useMutation(addBook, {
    onSuccess: (res, args) => {
      history.push('/dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setToast({
        status: 'success',
        message: `${args?.title} successfully added to your collection!`,
      });
    },
    onError: (error, args) => {
      setToast({
        status: 'error',
        message: `Error adding ${args?.title} to your collection!`,
      });
      if (error.response.status === 401) {
        history.push('/Auth');
      }
    },
  });
}

export function useEditBook() {
  const history = useHistory();
  const { setToast } =
    useContext(ToastContext);
  const editBook = (book) => {
    const bookId = book.book_id;
    delete book.book_id;
    return api.put(`/books/${bookId}`, book);
  };
  return useMutation(editBook, {
    onSuccess: (res, args) => {
      history.push('/dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setToast({
        status: 'success',
        message: `Successfully edited ${args?.title}!`,
      });
    },
    onError: (err, args) => {
      setToast({
        status: 'error',
        message: `Error making changes to${args?.title}!`,
      });
      console.log('error editing book', err);
    },
  });
}

export function useDeleteBook() {
  const history = useHistory();
  const { setToast } =
    useContext(ToastContext);
  const queryClient = useQueryClient();

  const deleteBook = (book) => api.delete(`/books/${book.book_id}`);

  return useMutation(deleteBook, {
    onSuccess: (res, args) => {
      history.push('/dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setToast({
        status: 'delete',
        message: `Successfully removed ${args?.title}!`,
      });
      queryClient.invalidateQueries('books');
    },
    onError: (err, args) => {
      setToast({
        status: 'error',
        message: `Error making changes to${args?.title}!`,
      });
      console.log('error deleting book', err);
    },
  });
}

export function useRateBook() {
  const { setToast } =
    useContext(ToastContext);
  const queryClient = useQueryClient();
  const { pageNumber } = useContext(PageContext);
  const rateBook = ({ rating, book }) =>
    api.put(`/books/${book.book_id}`, { rating });
  return useMutation(rateBook, {
    onSuccess: (res, args) => {
      const { book } = args;
      // updating caches
      queryClient.setQueryData(['books', pageNumber], (old) => {
        if (old) {
          const oldBookIndex = old.data[0].findIndex(
            (item) => item.book_id === book.book_id,
          );
          old.data[0].splice(oldBookIndex, 1, res.data);
          return old;
        }
      });
      queryClient.setQueryData(['lists', pageNumber], (old) => {
        if (old) {
          const oldBookIndex = old.books.findIndex(
            (item) => item.book_id === book.book_id,
          );
          old.books.splice(oldBookIndex, 1, res.data);
          return old;
        }
      });
      setToast({
        status: 'success',
        message: `Rated ${book?.title}!`,
      });
    },
    onError: (err, args) => {
      const { book } = args;
      setToast({
        status: 'error',
        message: `Error editing rating of ${book?.title}!`,
      });
      console.log('Error rating book', err);
    },
  });
}
