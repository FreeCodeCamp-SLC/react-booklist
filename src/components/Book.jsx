import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import bookImg from '../images/book.png';
import bookmark from '../images/bookmark-icon.png';
import { useAddFavorite } from '../hooks/useFavorites';

export default function Book({ book, lists }) {
  const { push } = useHistory();
  const [isFavorite, setIsFavorite] = useState(book.favorite);
  const { mutate } = useAddFavorite(setIsFavorite);

  const list = lists.data.filter(
    (singleList) => singleList.list_id === book.list_id,
  );
  const linkObj = {
    pathname: `/book/${book.book_id}`,
    state: { book },
  };

  const favoriteBookHandler = (boolean) => {
    mutate({ boolean, id: book.book_id });
  };

  return (
    <div
      onClick={(e) => {
        if (!e.target.matches('.cardBtn')) {
          push(linkObj);
        }
      }}
      className="flex flex-col items-center relative justify-center bg-white w-full  mt-7 mx-auto pt-6 pb-4 px-6 text-center rounded-md shadow-md cursor-pointer"
    >
      {isFavorite && (
        <svg
          onClick={() => favoriteBookHandler(false)}
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
      )}
      {!isFavorite && (
        <svg
          onClick={() => favoriteBookHandler(true)}
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
      )}
      <div className="max-h-48 rounded-sm overflow-hidden">
        <img
          className="w-32 m-3 shadow"
          src={book.image_url || bookImg}
          alt="book cover"
        />
      </div>

      <h3 className="text-gray-900 font-extrabold mt-3">{book.title}</h3>
      <h4 className="text-gray-600 mt-2">{book.author}</h4>
      <div className="w-full">
        {list && (
          <HashLink to={`/lists#${list[0].list_id}`}>
            <button
              type="button"
              className="bg-booklistRed text-white py-1 px-3 rounded-3xl font-semibold mt-4 shadow-md hover:bg-booklistRed-light hover:-translate-y-0.5 transform transition focus:outline-none focus:ring focus:ring-offset-2 focus:ring-booklistRed focus:ring-opacity-50 active:bg-booklistRed-dark"
            >
              {list[0].name}
            </button>
          </HashLink>
        )}
        <div className=" mt-4 pb-4 space-x-3 flex items-center justify-center font-bold">
          <div className="flex items-center justify-center">
            <img className="h-4 mr-1" src={bookmark} alt="bookmark icon" />
            Bookmark
          </div>
          <div>|</div>
          <div>pages: {book.pages ? book.pages : 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}
