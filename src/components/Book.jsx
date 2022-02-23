import React from 'react';
import bookImg from '../images/book.png';
import bookmark from '../images/bookmark-icon.png';

export default function Book({ book }) {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white w-full  mt-7 mx-auto pt-6 pb-32 px-6 text-center rounded-md shadow-md">
      <div className="max-h-48 rounded-sm overflow-hidden">
        <img
          className="w-32 m-3 shadow"
          src={book.image_url || bookImg}
          alt="book cover"
        />
      </div>
      <h3 className="text-gray-900 font-extrabold mt-3">{book.title}</h3>
      <h4 className="text-gray-600 mt-2">{book.author}</h4>
      <div className="absolute bottom-0 w-full">
        <button
          type="button"
          className="bg-booklistRed text-white py-1 px-3 rounded-3xl font-semibold mt-3.5 mb-10 shadow-md hover:bg-booklistRed-light hover:-translate-y-0.5 transform transition focus:outline-none focus:ring focus:ring-offset-2 focus:ring-booklistRed focus:ring-opacity-50 active:bg-booklistRed-dark"
        >
          Genre
        </button>
        <div className=" pb-4 px-8  flex items-center justify-between font-bold">
          <div className="flex items-center">
            <img className="h-4 mr-1" src={bookmark} alt="bookmark icon" />
            Bookmark
          </div>
          |<div className="flex">pages: {book.pages ? book.pages : 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}
