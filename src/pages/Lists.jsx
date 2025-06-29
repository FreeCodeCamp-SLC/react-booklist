import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import useListsApi, { getbooksByList } from '../hooks/useListsApi';
import Header from '../components/Header';
import List from '../components/List';
import SortOptions from '../components/SortOptions';
import PageSelectors from '../components/PageSelectors';
import PaginationOptions from '../components/PaginationOptions';
import PageContext from '../contexts/page-context';
import api from '../config';

export default function Lists() {
  const location = useLocation();
  const listName = location.state?.listName;

  const {
    listsItemCount,
    pageNumber,
    setListsItemCount,
    setPageNumber,
    setSortBy,
    sortBy,
  } = React.useContext(PageContext);
  const {
    data: lists,
    isLoading: listsIsLoading,
    isError: listsIsError,
    refetch: refetchLists,
  } = useListsApi(listsItemCount, pageNumber, sortBy);

  const [searchResults, setSearchResults] = React.useState(null);

  let totalBookPages = 0;
  if (lists && lists.books) {
    totalBookPages = lists.books.length;
  }

  React.useEffect(async () => {
    await refetchLists();
  }, [listsItemCount, pageNumber, sortBy]);

  function searchHandler(query) {
    if (query.length > 2) {
      api
        .get(`/searchLists`, {
          query,
          sortBy,
        })
        .then(async (res) => {
          const listIds = res.data.map((list) => list.list_id);
          let booksByList;
          if (listIds.length > 0) {
            booksByList = await getbooksByList(listIds);
          }
          setSearchResults({
            lists: res.data,
            books: booksByList?.data,
          });
        })
        .catch((err) => {
          setSearchResults(null);
          console.log(err);
        });
    } else {
      setSearchResults(null);
    }
  }

  React.useEffect(() => {
    if (listName) {
      searchHandler(listName);
    }
  }, [listName]);

  return (
    <section className="sm:grid grid-cols-layout grid-rows-layout">
      <Header searchHandler={searchHandler} listName={listName} />
      <div className="min-h-screen sm:min-h-full col-start-2 row-start-2 bg-gray-100 relative pb-20">
        <div className="flex py-5 px-6 justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:hidden inline-block">
            Lists
          </h2>
          <SortOptions setSortBy={setSortBy} sortBy={sortBy} isLists />
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
            <span className="text-sm hidden sm:inline-block">new list</span>
          </div>
        </div>
        {listsIsLoading && (
          <div className="flex justify-center items-center mt-40">
            <div
              className="spinner-border animate-spin inline-block w-32 h-32 border-8 rounded-full text-booklistBlue-light"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {listsIsError && (
          <h2 className="px-5 pt-5 text-3xl font-bold text-gray-900">
            Error Fetching Books
          </h2>
        )}
        {lists && (
          <>
            <div
              className={`grid grid-cols-1 pb-6 mx-6 gap-6 ${
                lists?.lists?.length === 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-2'
              } ${
                lists?.lists?.length === 1
                  ? 'xl:grid-cols-1'
                  : lists?.lists?.length === 2
                  ? 'xl:grid-cols-2'
                  : 'xl:grid-cols-3'
              }`}
            >
              {!searchResults &&
                lists?.lists.map((list) => (
                  <List
                    key={list.list_id}
                    list={list}
                    id={list.list_id}
                    booksInList={lists?.books.filter(
                      (book) => book.list_id === list.list_id,
                    )}
                    refetchLists={refetchLists}
                  />
                ))}
              {searchResults &&
                searchResults?.lists.length > 0 &&
                searchResults?.lists.map((list) => (
                  <List
                    key={list.list_id}
                    list={list}
                    id={list.list_id}
                    booksInList={searchResults?.books.filter(
                      (book) => book.list_id === list.list_id,
                    )}
                    refetchLists={refetchLists}
                  />
                ))}
            </div>

            {!searchResults && (
              <div className="justify-center absolute bottom-0 w-full pb-4">
                <PageSelectors
                  setPageNumber={setPageNumber}
                  pageNumber={pageNumber}
                  listsItemCount={listsItemCount}
                  totalBooksPages={totalBookPages}
                  totalListsPages={lists.totalListCount}
                  isLists
                />
                <PaginationOptions
                  setListsItemCount={setListsItemCount}
                  isLists
                />
              </div>
            )}
          </>
        )}
        <a href="https://book-lists.com/dashboard">book-lists.com/dashboard</a>
      </div>
    </section>
  );
}
