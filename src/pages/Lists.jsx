import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import useListsApi from '../hooks/useListsApi';
import Header from '../components/Header';
import useBooksApi from '../hooks/useBooksApi';
import List from '../components/List';
import SortOptions from '../components/SortOptions';

export default function Lists() {
  const {
    data: lists,
    isLoading: listsIsLoading,
    isError: listsIsError,
    refetch: refetchLists,
  } = useListsApi();
  const {
    data: books,
    isLoading: booksIsLoading,
    isError: booksIsError,
    refetch: refetchBooks,
  } = useBooksApi();
  const [sortBy, setSortBy] = useState('Recently Added - Ascending');

  const sortHandler = () => {
    const sortedLists = [...lists.data];
    switch (sortBy) {
      case 'By Year - Ascending':
        sortedLists.sort((a, b) => {
          if (a.year < b.year) {
            return -1;
          }
          if (a.year > b.year) {
            return 1;
          }
          return 0;
        });
        break;
      case 'By Year - Descending':
        sortedLists.sort((a, b) => {
          if (a.year < b.year) {
            return 1;
          }
          if (a.year > b.year) {
            return -1;
          }
          return 0;
        });
        break;
      case 'Alphabetically - Ascending':
        sortedLists.sort((a, b) => {
          const aLowerCase = a.name.toLowerCase();
          const bLowerCase = b.name.toLowerCase();
          if (aLowerCase < bLowerCase) {
            return -1;
          }
          if (aLowerCase > bLowerCase) {
            return 1;
          }
          return 0;
        });
        break;
      case 'Alphabetically - Descending':
        sortedLists.sort((a, b) => {
          const aLowerCase = a.name.toLowerCase();
          const bLowerCase = b.name.toLowerCase();
          if (aLowerCase < bLowerCase) {
            return 1;
          }
          if (aLowerCase > bLowerCase) {
            return -1;
          }
          return 0;
        });
        break;
      case 'Recently Added - Ascending':
        sortedLists.sort((a, b) => {
          if (a.list_id < b.list_id) {
            return 1;
          }
          if (a.list_id > b.list_id) {
            return -1;
          }
          return 0;
        });
        break;
      case 'Recently Added - Descending':
        sortedLists.sort((a, b) => {
          if (a.list_id < b.list_id) {
            return -1;
          }
          if (a.list_id > b.list_id) {
            return 1;
          }
          return 0;
        });
        break;
      default:
        sortedLists.sort((a, b) => {
          if (a.list_id < b.list_id) {
            return -1;
          }
          if (a.list_id > b.list_id) {
            return 1;
          }
          return 0;
        });
        break;
    }
    return (
      <div className="grid grid-cols-1 pb-6 mx-6 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {sortedLists?.map((list) => (
          <List
            key={list.list_id}
            list={list}
            id={list.list_id}
            booksInList={books?.data.filter(
              (book) => book.list_id === list.list_id,
            )}
            refetchLists={refetchLists}
            refetchBooks={refetchBooks}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      <div className="min-h-full col-start-2 row-start-2 bg-gray-100 ">
        <div className="flex py-5 px-6 justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Lists</h2>
          <SortOptions setSortBy={setSortBy} isLists />
          <div className="flex flex-col items-center">
            <Link className="text-booklistBlue-dark" to="add-list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
            <span className="text-sm">new list</span>
          </div>
        </div>
        {(listsIsLoading || booksIsLoading) && (
          <h2 className="px-5 pt-5 text-3xl font-bold text-gray-900">
            Loading Lists...
          </h2>
        )}
        {(listsIsError || booksIsError) && (
          <h2 className="px-5 pt-5 text-3xl font-bold text-gray-900">
            Error Fetching Books
          </h2>
        )}
        {lists?.data && sortHandler(setSortBy)}
        <div className="mx-5 overflow-hidden rounded-md shadow-md mt-7" />
      </div>
    </section>
  );
}
