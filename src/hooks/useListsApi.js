import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../config';

export const getbooksByList = (listIds) => api.get(`/booksByList`, { listIds });

export default function useListsApi(booksItemCount, pageNumber, sortBy) {
  const getLists = async () => {
    try {
      const lists = await api.get(`/lists`, {
        booksItemCount,
        pageNumber,
        sortBy,
      });
      const listIds = lists.data[0].map((list) => list.list_id);
      let booksByList;
      if (listIds.length > 0) {
        booksByList = await getbooksByList(listIds);
      }

      return {
        lists: lists?.data[0],
        ...lists?.data[1],
        books: booksByList?.data,
      };
    } catch (err) {
      console.log('err', err);
      return {
        lists: [],
        booksByList: [],
      };
    }
  };
  return useQuery(['lists', pageNumber], getLists);
}

export const useGetAllLists = () => {
  const getLists = api.get(`/allLists`);

  return useQuery('allLists', () => getLists);
};

export const useDeleteList = (id, setModalIsOpen) => {
  const queryClient = useQueryClient();
  const deleteList = () => api.delete(`/lists/${id}`);
  return useMutation(deleteList, {
    onSuccess: () => {
      queryClient.setQueryData('allLists', (old) => {
        const filteredLists = old.data.filter((list) => list.list_id !== id);
        old.data = filteredLists;
        return old;
      });
      document.body.style.overflowY = 'visible';
      setModalIsOpen(false);
    },
    onError: (err) => {
      console.log('error deleting lists', err);
    },
  });
};

export const useDeleteAllBooks = (booksInList) => {
  const deleteAllBooks = () =>
    Promise.all(
      booksInList.map((book) => api.delete(`/books/${book.book_id}`)),
    );
  return useMutation(deleteAllBooks, {
    onError: (err) => {
      console.log('error deleting books', err);
    },
  });
};

export function useAddList(history) {
  const queryClient = useQueryClient();

  const addList = ({ name, year }) =>
    api.post(`/lists`, {
      name,
      year,
    });

  return useMutation(addList, {
    onSuccess: (res) => {
      queryClient.setQueryData('allLists', (old) => {
        old.data = [...old?.data, res.data];
        return old;
      });
      history.push('/lists');
    },
    onError: (err) => {
      console.log('error adding favorite', err);
    },
  });
}
