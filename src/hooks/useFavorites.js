import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../config';
import ToastContext from '../contexts/toast-context';

export default function useFavorites(booksItemCount, pageNumber, sortBy) {
  const getFavorites = api.get(`/favorites`, {
    booksItemCount,
    pageNumber,
    sortBy,
  });

  return useQuery(['favorites', pageNumber], () => getFavorites);
}

export function useAddFavorite() {
  const queryClient = useQueryClient();
  const { setToastFade, setToastStatus, setBook, setToastType } = useContext(ToastContext);


  const favoriteHandler = ({ boolean, book }) => api.put(`/books/${book.book_id}`, {
      favorite: boolean,
    });

  return useMutation(favoriteHandler, {
    onSuccess: (res, args) => {
      const { book, pageNumber, boolean } = args;
      // updating cache
      queryClient.setQueryData(['books', pageNumber], (old) => {
        const oldBookIndex = old.data[0].findIndex(
          (item) => item.book_id === book.book_id,
        );
        old.data[0].splice(oldBookIndex, 1, res.data);
        return old;
      });
      // triggering toast
      setToastFade(true);
      setToastStatus(boolean ? 'success' : 'remove');
      setToastType(boolean ? 'favoriting' : 'unfavoriting');
      setBook(book);
      setTimeout(() => {
        setToastFade(false);
      }, 2000);
    },
    onError: (error, args) => {

      const { book } = args;
      setToastFade(true);
      setToastStatus('error');
      setBook(book);
      setTimeout(() => {
        setToastFade(false);
      }, 2000);
      console.log('error adding favorite', error);
    },
  });
}
