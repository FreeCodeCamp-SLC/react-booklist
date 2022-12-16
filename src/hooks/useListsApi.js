import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import api from '../config';
import ToastContext from '../contexts/toast-context';

export const getbooksByList = (listIds) => api.get(`/booksByList`, { listIds });

export default function useListsApi(booksItemCount, pageNumber, sortBy) {
  const history = useHistory();

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
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/Auth');
      }
      return {
        lists: [],
        booksByList: [],
      };
    }
  };
  return useQuery(['lists', pageNumber], getLists, {
    retry: 1
  });
}

export const useGetAllLists = () => {
  const history = useHistory();

  const getLists = api.get(`/allLists`);

  return useQuery('allLists', () => getLists, {
    onError: (error) => {
      console.log('error', error);
      if (error.response.status === 401) {
        history.push('/Auth');
      }
    },
    retry: 1,
  });
};

export const useDeleteList = (id, setModalIsOpen, list) => {
  const { setToastFade, setToastStatus, setBook, setToastType } =
    useContext(ToastContext);
  const queryClient = useQueryClient();
  const deleteList = () => api.delete(`/lists/${id}`);
  return useMutation(deleteList, {
    onSuccess: (res, args) => {
      queryClient.setQueryData('allLists', (old) => {
        const filteredLists = old.data.filter((list) => list.list_id !== id);
        old.data = filteredLists;
        return old;
      });
      document.body.style.overflowY = 'visible';
      setModalIsOpen(false);
      setToastStatus('remove');
      setToastType('delete_list');
      // rename this state
      setBook(list.name);
      setTimeout(() => {
        setToastFade(true);
      }, 250);
      setTimeout(() => {
        setToastFade(false);
      }, 2000);
    },
    onError: () => {
      setToastStatus('error');
      setBook(list);
      setToastFade(true);
      setTimeout(() => {
        setToastFade(false);
      }, 2000);
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
  const { setToastFade, setToastStatus, setBook, setToastType } =
    useContext(ToastContext);

  const queryClient = useQueryClient();

  const addList = ({ name, year }) =>
    api.post(`/lists`, {
      name,
      year,
    });

  return useMutation(addList, {
    onSuccess: (res, args) => {
      const { name } = args;
      queryClient.setQueryData('allLists', (old) => {
        old.data = [...old?.data, res.data];
        return old;
      });
      history.push('/lists');
      setToastStatus('success');
      setToastType('add_list');
      // rename this state
      setBook({ name });
      setTimeout(() => {
        setToastFade(true);
      }, 250);
      setTimeout(() => {
        setToastFade(false);
      }, 2000);
    },
    onError: (err, args) => {
      const { name } = args;
      setToastStatus('error');
      setBook({ name });
      setToastFade(true);
      setTimeout(() => {
        setToastFade(false);
      }, 2000);
      console.log('error adding favorite', err);
    },
  });
}
