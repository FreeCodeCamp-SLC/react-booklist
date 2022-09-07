import { useQuery, useMutation } from 'react-query';
import api from '../config';


export default function useFavorites(booksItemCount, pageNumber, sortBy) {
  const getFavorites = api.get(`/favorites`, {
    booksItemCount,
    pageNumber,
    sortBy,
  });

  return useQuery(['favorites', pageNumber], () => getFavorites);
}

export function useAddFavorite(setisFavorite) {
  const favoriteHandler = ( {boolean, id}) => api.put(`/books/${id}`, {
      favorite: boolean,
   })
  return useMutation(favoriteHandler, {
    onSuccess:  (_, arugments) => {
      setisFavorite(arugments.boolean)

      },
    onError: (err) => {
      console.log('error adding favorite', err);
    },
  });
}
