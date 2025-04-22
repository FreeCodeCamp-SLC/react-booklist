import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import api from '../config';
import ToastContext from '../contexts/toast-context';

export default function useFavorites(booksItemCount, pageNumber, 
	// sortBy
) {
  const history = useHistory();

  const getFavorites = api.get(`/favorites`, {
    booksItemCount,
    pageNumber,
    // sortBy,
  });
  return useQuery(['favorites', pageNumber], () => getFavorites, {
    onError: (error) => {
      if (error.response.status === 401) {
        history.push('/Auth');
      }
    },
    // retry: 1,
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();
  const { setToast } =
    useContext(ToastContext);

  const favoriteHandler = ({ boolean, book,  }) =>
    api.put(`/books/${book.book_id}`, {
      favorite: boolean,
    });

  return useMutation(favoriteHandler, {
    onSuccess: (res, args) => {
      const { book, pageNumber, boolean, isFavoritesPage } = args;
      queryClient.setQueryData([isFavoritesPage ? 'favorites' : 'books', pageNumber], (old) => {
        const oldBookIndex = old.data[0].findIndex(
          (item) => item.book_id === book.book_id,
        );
        old.data[0].splice(oldBookIndex, 1, res.data);
        return old;
      });
      setToast({
        status: boolean ? 'success' : 'delete',
        message: `${boolean ? 'Favorited' : 'Unfavorited'} ${book?.title}!`,
      });
    },
    onError: (error, args) => {
     const {boolean, book} = args;
      setToast({
        status: 'error',
        message: `Error ${boolean ? 'favoriting' : 'unfavoriting'} ${book?.title}!`,
      });
    },
  });
}
