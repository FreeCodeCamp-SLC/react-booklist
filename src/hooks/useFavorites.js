import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../config';


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

  const favoriteHandler = ( {boolean, id}) => api.put(`/books/${id}`, {
      favorite: boolean,
   })
   
  return useMutation(favoriteHandler, {
    onSuccess:  (res, args) => {
      const {pageNumber} = args;
      queryClient.setQueryData(['books', pageNumber], (old) => {
        const oldBookIndex = old.data[0].findIndex((book) => book.book_id === args.id);
         old.data[0].splice(oldBookIndex, 1, res.data);
         return old
      })

      },
    onError: (err) => {
      console.log('error adding favorite', err);
    },
  });
}
