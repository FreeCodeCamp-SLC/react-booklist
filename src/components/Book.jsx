import React from 'react';
import { useHistory } from 'react-router-dom';
import bookImg from '../images/book.png';
import { useAddFavorite } from '../hooks/useFavorites';
import RatingStars from './RatingStars';
import readingStatus from '../utils/readingStatus';

export default function Book({ book, lists, pageNumber, isFavoritesPage }) {
  const { push } = useHistory();
  const { mutate: favoriteBook } = useAddFavorite();
  const favoriteBookHandler = (boolean) => {
    favoriteBook({ boolean, book, pageNumber, isFavoritesPage });
  };

  const list = lists.data.filter(
    (singleList) => singleList.list_id === book.list_id,
  );

  function navigateToEditBook(e) {
    const bookObj = {
      pathname: `/book/${book.book_id}`,
      state: { book },
    };
    if (!e.target.matches('.cardBtn')) {
      push(bookObj);
    }
  }

  function navigateToList(e) {
    const listObj = {
      pathname: `/lists`,
      state: { listName: e.target.innerHTML },
    };
    push(listObj);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => navigateToEditBook(e)}
      onKeyPress={(e) => e.key === 'Enter' && navigateToEditBook(e)}
      className="flex flex-col items-center relative justify-center bg-white w-full  mt-7 mx-auto pt-6 pb-4 px-6 text-center rounded-md shadow-md cursor-pointer focus:ring focus:ring-booklistBlue    focus:ring-opacity-50"
    >
      {book.favorite && (
        <button
          className="cardBtn focus:ring-booklistBlue focus:ring-opacity-50 focus:ring-2 absolute top-2 right-2"
          type="button"
          onClick={() => favoriteBookHandler(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 text-booklistRed absolute top-0 right-0 mt-4 mr-6 hover:-translate-y-0.5 transform transition hover:text-gray-400 cardBtn"
          >
            <path
              className="cardBtn"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      )}
      {!book.favorite && (
        <button
          className="cardBtn focus:ring-booklistBlue focus:ring-opacity-50 focus:ring-2 absolute top-2 right-2"
          type="button"
          onClick={() => favoriteBookHandler(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 text-gray-300 absolute top-0 right-0 mt-4 mr-6 hover:-translate-y-0.5 transform transition hover:text-booklistRed cardBtn"
          >
            <path
              className="cardBtn"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      )}
      <div className="max-h-48 rounded-sm overflow-hidden">
        <img
          className="w-32 m-3 shadow"
          src={book.image_url || bookImg}
          alt="book cover"
        />
      </div>

      <h3 className="text-gray-900 font-extrabold mt-3">{book.title}</h3>
      <h4 className="text-gray-600 mt-1">{book.author}</h4>
      <h4 className="text-gray-900 mt-2">
        pages:{' '}
        {book.bookmark_page &&
          book.bookmark_page > 1 &&
          `${book.bookmark_page} /`}{' '}
        {book.pages ? book.pages : 'N/A'}
      </h4>
      <div className="w-full">
        {list && (
          <button
            onClick={(e) => navigateToList(e)}
            type="button"
            className="cardBtn bg-booklistRed text-white py-1 px-3 rounded-3xl font-semibold mt-3 shadow-md hover:bg-booklistRed-light hover:-translate-y-0.5 transform transition focus:outline-none focus:ring focus:ring-offset-2 focus:ring-booklistRed focus:ring-opacity-50 active:bg-booklistRed-dark"
          >
            {list[0].name}
          </button>
        )}
        <h4 className="text-gray-900 my-3 font-bold">
          {readingStatus[`${book.reading_status_id}`]}
        </h4>
        <RatingStars book={book} />
      </div>
    </div>
  );
}
