import { useQuery, useMutation } from 'react-query';
import api from '../config'

export default function useListsApi() {
  const getAllLists = () => api.get(`/lists`) 
    return useQuery('lists', getAllLists);
}

export const useDeleteList = (id, setModalIsOpen) => {
const deleteList = () => api.delete(`/lists/${id}`);
return useMutation(deleteList, {
  onSuccess: () => {
    document.body.style.overflowY = 'visible';
    setModalIsOpen(false)
  },
  onError: (err) => {
    console.log('error deleting lists', err)
}})
}

export const useDeleteAllBooks = (booksInList) => {
  const deleteAllBooks = () => Promise.all(
    booksInList.map((book) =>
      api.delete(`/books/${book.book_id}`),
    ),
  );
  return  useMutation(deleteAllBooks, {
    onError: (err) => {
      console.log('error deleting books', err)
    }
  })
}