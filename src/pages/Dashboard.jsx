import React from 'react';
import Book from '../components/Book';
import Header from '../components/Header';
import PageSelectors from '../components/PageSelectors';
import PaginationOptions from '../components/PaginationOptions';
import SortOptions from '../components/SortOptions';
import api from '../config';
import PageContext from '../contexts/page-context';
import useGetBooks from '../hooks/useBooksApi';
import { useGetAllLists } from '../hooks/useListsApi';

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
  } = React.useContext(PageContext);

  const { data: lists } = useGetAllLists();
  const {
    data: books,
    isLoading,
    isError,
    // refetch
  } = useGetBooks();

  const [searchResults, setSearchResults] = React.useState([]);

  // useEffect(() => {
  //   refetch();
  // }, [booksItemCount, pageNumber, sortBy]);

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
      <Header searchHandler={searchHandler} />
      <div className="min-h-screen sm:min-h-full col-start-2 row-start-2 bg-gray-100 relative pb-20">
        <div className="px-6 pt-5 flex justify-center items-center">
          <h2 className=" text-3xl font-bold text-gray-900 sm:hidden inline-block">
            Books
          </h2>
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
                books.data[0]?.map((book) => (
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
              <div className="justify-center absolute bottom-0 w-full pb-4">
                <SortOptions setSortBy={setSortBy} sortBy={sortBy} />
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
              </div>
            )}
          </>
        )}
        <div>
          <a href="https://book-lists.com/dashboard">
            book-lists.com/dashboard
          </a>
        </div>
      </div>
    </section>
  );
}
