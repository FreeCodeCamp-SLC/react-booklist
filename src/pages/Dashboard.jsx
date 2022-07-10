import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useBooksApi from '../hooks/useBooksApi';
import { saveAuthToken, loadAuthToken } from '../utils/local-storage';
import Book from '../components/Book';
import Header from '../components/Header';
import SortOptions from '../components/SortOptions';
import PageContext from '../contexts/page-context';
import PageSelectors from '../components/PageSelectors';

export default function DashboardPage() {
  const { getAccessTokenSilently } = useAuth0();
  const {
    itemCount,
    pageNumber,
    setItemCount,
    setPageNumber,
    sortBy,
    setSortBy,
  } = useContext(PageContext);
  useEffect(async () => {
    if (loadAuthToken) {
      return;
    }
    const getAccessToken = async () => {
      try {
        const retrievedAccessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: 'read:current_user',
        });
        saveAuthToken(retrievedAccessToken);
      } catch (e) {
        console.log(e.message);
      }
    };
    await getAccessToken();
  }, []);

  const {
    data: books,
    isLoading,
    isError,
    refetch,
  } = useBooksApi(itemCount, pageNumber, sortBy);

  console.log('books', books);
  useEffect(() => {
    refetch();
  }, [itemCount, pageNumber, sortBy]);

  return (
    <section className="sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      <div className="min-h-full col-start-2 row-start-2 bg-gray-100">
        <div className="px-5 pt-5 flex justify-between">
          <h2 className=" text-3xl font-bold text-gray-900">Books</h2>

          <SortOptions setSortBy={setSortBy} />
        </div>
        {isLoading && (
          <h2 className="px-5 pt-5 text-3xl font-bold text-gray-900">
            Loading Books...
          </h2>
        )}
        {isError && (
          <h2 className="px-5 pt-5 text-3xl font-bold text-gray-900">
            Error Fetching Books
          </h2>
        )}
        {books?.data && (
          <>
            <div className="grid grid-cols-1 pb-6 mx-6 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.data[0].map((book) => (
                <Book book={book} key={book.book_id} />
              ))}
            </div>
            <PageSelectors
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
              itemCount={itemCount}
              totalPages={books.data[1]}
            />
          </>
        )}
      </div>
    </section>
  );
}
