import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import API_BASE_URL from '../config';
import authHeaders from "../utils/axios-request-header";

export default function useListsApi() {

  const getAllLists = () => axios.get(`${API_BASE_URL}/lists`, authHeaders) 


    return useQuery('collections', getAllLists);
}

export const useDeleteList = (id, setModalIsOpen) => {
const deleteList = () => axios.delete(`${API_BASE_URL}/lists/${id}`, authHeaders);
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
      axios.delete(`${API_BASE_URL}/books/${book.book_id}`, authHeaders),
    ),
  );
  return  useMutation(deleteAllBooks, {
    onError: (err) => {
      console.log('error deleting books', err)
    }
  })
}