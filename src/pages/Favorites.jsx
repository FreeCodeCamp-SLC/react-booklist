import React, { useContext, useEffect, useState } from 'react';
import PageContext from '../contexts/page-context';
import PageSelectors from '../components/PageSelectors';
import PaginationOptions from '../components/PaginationOptions';
import SortOptions from '../components/SortOptions';
import Header from '../components/Header';
import Book from '../components/Book';
import useFavorites from '../hooks/useFavorites';
import { useGetAllLists } from '../hooks/useListsApi';
import api from '../config';

export default function FavoritesPage() {
  const {
    booksItemCount,
    pageNumber,
    setBooksItemCount,
    setPageNumber,
    sortBy,
    setSortBy,
  } = useContext(PageContext);
  const { data: lists } = useGetAllLists();
  const {
    data: favorites,
    isLoading,
    isError,
    refetch,
  } = useFavorites(booksItemCount, pageNumber, sortBy);
  useEffect(() => {
    refetch();
  }, [booksItemCount, pageNumber, sortBy]);
  useEffect(async () => {
    setPageNumber(1);
  }, []);

  const [searchResults, setSearchResults] = useState([]);

  function searchHandler(query) {
    if (query.length > 2) {
      api
        .get(`/searchFavorites`, {
          bookQuery: query,
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
    <section className=" sm:grid grid-cols-layout grid-rows-layout">
      <Header searchHandler={searchHandler} />
      <div className="min-h-full col-start-2 row-start-2 bg-gray-100 ">
        <div className="flex pt-5 justify-between items-center">
          <h2 className="px-4 text-3xl font-bold text-gray-900 ">Favorites</h2>
          <SortOptions setSortBy={setSortBy} sortBy={sortBy} />
        </div>
        {isLoading && (
          <h2 className="px-5 pt-5 text-3xl font-bold text-gray-900">
            Loading Favorites...
          </h2>
        )}
        {isError && (
          <h2 className="px-5 pt-5 text-3xl font-bold text-gray-900">
            Error Fetching Favorites
          </h2>
        )}
        {favorites?.data && lists && (
          <>
            <div className="grid grid-cols-1 pb-6 mx-6 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults?.length === 0 &&
                favorites.data[0].map((favorite) => (
                  <Book book={favorite} key={favorite.book_id} lists={lists} />
                ))}
              {searchResults?.length > 0 &&
                searchResults.map((favorite) => (
                  <Book book={favorite} key={favorite.book_id} lists={lists} />
                ))}
            </div>
            {searchResults?.length === 0 && (
              <>
                <PageSelectors
                  setPageNumber={setPageNumber}
                  pageNumber={pageNumber}
                  booksItemCount={booksItemCount}
                  totalBooksPages={favorites.data[1]}
                />
                <PaginationOptions setBooksItemCount={setBooksItemCount} />
              </>
            )}
          </>
        )}
      </div>
      <div className="mx-5 overflow-hidden rounded-md shadow-md mt-7" />
    </section>
  );
}
