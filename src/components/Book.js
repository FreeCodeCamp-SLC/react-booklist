import React from "react";
import bookImg from "../images/book.png";
import bookmark from "../images/bookmark-icon.png";

export default function Book({ book }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white w-full  mt-7 mx-auto py-7 rounded-md shadow-md">
      <div className="inline">
        <img className="max-h-40 my-3" src={bookImg} alt="book cover" />
      </div>
      <h3 className="text-gray-900 font-extrabold mt-3">{book.title}</h3>
      <h4 className="text-gray-600 mt-2">{book.author}</h4>
      <button className="bg-booklistRed text-white py-1 px-3 rounded-3xl font-semibold mt-3.5 mb-10 shadow-md hover:bg-booklistRed-light hover:-translate-y-0.5 transform transition focus:outline-none focus:ring focus:ring-offset-2 focus:ring-booklistRed focus:ring-opacity-50 active:bg-booklistRed-dark">
        {book.genre}
      </button>
      <div className="flex items-center justify-between w-52 font-bold">
        <img className="h-4" src={bookmark} alt="bookmark icon" />
        <p>Bookmark</p>
        <p> | </p>
        <p>Page:</p>
        <p>250</p>
      </div>
    </div>
  );
}
