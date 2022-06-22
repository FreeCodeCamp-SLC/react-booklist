import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useBooksApi from '../hooks/useBooksApi';
import { saveAuthToken } from '../utils/local-storage';
import Book from '../components/Book';
import Header from '../components/Header';
import SortOptions from '../components/SortOptions';

export default function DashboardPage() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(async () => {
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

  const { data: books, isLoading, isError } = useBooksApi();

  const sortHandler = (sortBy) => {
    const titles = books.data.map((book) => book.title);

    const sortedBooks = [...books.data];

    sortedBooks.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    return (
      <div className="grid grid-cols-1 pb-6 mx-6 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedBooks.map((book) => (
          <Book book={book} key={book.book_id} />
        ))}
      </div>
    );
  };

  return (
    <section className="sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      <div className="min-h-full col-start-2 row-start-2 bg-gray-100">
        <div className="flex justify-between">
          <h2 className="px-5 pt-5 text-3xl font-bold text-gray-900">Books</h2>
          <SortOptions />
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
        {books?.data && sortHandler()}
      </div>
    </section>
  );
}
