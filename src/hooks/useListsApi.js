import { useQuery, useMutation } from 'react-query';
import api from '../config'

const getbooksByList = (listIds) => api.get(`/booksByList`,  {listIds})

export default function useListsApi(booksItemCount, pageNumber, sortBy) {
  // make getalllists a funtion where we try both the endpoits and returns both values on return

  const getAllLists = async () => {
try {
  const lists = await api.get(`/lists`, {booksItemCount, pageNumber, sortBy}) 
  const listIds =  lists.data[0].map((list) => list.list_id)
  const booksByList = await getbooksByList(listIds)

   return{
     lists: lists.data[0],
     ...lists.data[1],
     books: booksByList.data
   }

} catch(err){
console.log('err', err)
return {
  lists: [],
  booksByList: []
}
}

  } 
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