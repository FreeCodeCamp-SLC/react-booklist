import React, { useContext, useEffect, useState } from 'react';
import useGetBooks from '../hooks/useBooksApi';
import Book from '../components/Book';
import Header from '../components/Header';
import SortOptions from '../components/SortOptions';
import PageContext from '../contexts/page-context';
import PageSelectors from '../components/PageSelectors';
import PaginationOptions from '../components/PaginationOptions';
import Toasts from '../components/Toasts';
import { useGetAllLists } from '../hooks/useListsApi';
import api from '../config';

export default function DashboardPage() {
  const {
    booksItemCount,
    pageNumber,
    setBooksItemCount,
    setListsItemCount,
    listsItemCount,
    setPageNumber,
    sortBy,
    setSortBy,
  } = useContext(PageContext);

  const { data: lists } = useGetAllLists();
  const { data: books, isLoading, isError, refetch } = useGetBooks();

  const [searchResults, setSearchResults] = useState([]);

  useEffect(async () => {
    setPageNumber(1);
  }, []);

  useEffect(() => {
    refetch();
  }, [booksItemCount, pageNumber, sortBy]);

  function searchHandler(query) {
    if (query.length > 2) {
      api
        .get(`/searchBooks`, {
          query,
          sortBy,
        })
        .then((res) => {
          setSearchResults(res.data);
        })
        .catch((err) => {
          setSearchResults(null);
          console.log(err);
        });
    } else {
      setSearchResults([]);
    }
  }

  return (
    <section className="sm:grid grid-cols-layout grid-rows-layout">
      <Toasts />
      <Header searchHandler={searchHandler} />
      <div className="min-h-full col-start-2 row-start-2 bg-gray-100">
        <div className="px-6 pt-5 flex justify-between items-center">
          <h2 className=" text-3xl font-bold text-gray-900 sm:hidden inline-block">
            Books
          </h2>

          <SortOptions setSortBy={setSortBy} sortBy={sortBy} />
        </div>
        {isLoading && (
          <div className="flex justify-center items-center mt-40">
            <div
              className="spinner-border animate-spin inline-block w-32 h-32 border-8 rounded-full text-booklistBlue-light"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {isError && (
          <h2 className="px-5 pt-5 text-3xl font-bold text-gray-900">
            Error Fetching Books
          </h2>
        )}
        {books?.data && lists && (
          <>
            <div className="grid grid-cols-1 pb-6 mx-6 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults?.length === 0 &&
                books.data[0].map((book) => (
                  <Book
                    book={book}
                    key={book.book_id}
                    lists={lists}
                    pageNumber={pageNumber}
                  />
                ))}
              {searchResults?.length > 0 &&
                searchResults.map((book) => (
                  <Book
                    book={book}
                    key={book.book_id}
                    lists={lists}
                    pageNumber={pageNumber}
                  />
                ))}
            </div>
            {searchResults?.length === 0 && (
              <>
                <PageSelectors
                  setPageNumber={setPageNumber}
                  pageNumber={pageNumber}
                  listsItemCount={listsItemCount}
                  booksItemCount={booksItemCount}
                  totalBooksPages={books.data[1]}
                />
                <PaginationOptions
                  setBooksItemCount={setBooksItemCount}
                  setListsItemCount={setListsItemCount}
                />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
