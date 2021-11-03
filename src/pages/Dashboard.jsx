import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useBooksApi from '../hooks/useBooksApi';
import { saveAuthToken } from '../utils/local-storage';
import Book from '../components/Book';
import Header from '../components/Header';

export default function DashboardPage() {
  const { getAccessTokenSilently } = useAuth0();
  const { getAllBooks } = useBooksApi();
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);

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

    const getAllBooksEffect = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    await getAccessToken();
    getAllBooksEffect();
  }, []);

  useEffect(() => {
    if (books) {
      setLoading(false);
    }
  }, [books]);

  let booklist;
  if (loading) {
    booklist = null;
  } else {
    booklist = (
      <div className="grid grid-cols-1 pb-6 mx-6 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <Book book={book} key={book.book_id} />
        ))}
      </div>
    );
  }

  return (
    <section className="sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      <div className="min-h-screen col-start-2 row-start-2 bg-gray-100">
        <div>
          <h2 className="px-5 pt-5 text-3xl font-bold text-gray-900">Books</h2>
        </div>
        {booklist}
      </div>
    </section>
  );
}
