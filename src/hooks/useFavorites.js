import { useQuery } from 'react-query';
import api from "../config"; 

export default function useFavorites(booksItemCount, pageNumber, sortBy) {
  const getFavorites = api.get(`/favorites`, {
    booksItemCount,
    pageNumber,
    sortBy,
  });

  return useQuery(['favorites', pageNumber], () => getFavorites);
}
