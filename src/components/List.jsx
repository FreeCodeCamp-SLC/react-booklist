import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bookImg from '../images/book.png';
import BookIcon from './BookIcon';
import Rating from './Rating';
import API_BASE_URL from '../config';
import { loadAuthToken } from '../utils/local-storage';

const List = ({ id, listName, booksInList, getBooks, getLists }) => {
  function deleteListHandler() {
    const authToken = loadAuthToken();
    Promise.all(
      booksInList.map((book) =>
        axios.delete(`${API_BASE_URL}/books/${book.book_id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }),
      ),
    )
      .then(() => {
        axios
          .delete(`${API_BASE_URL}/lists/${id}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then(() => {
            getBooks();
            getLists();
          })
          .catch((err) => {
            console.log('list deletion err', err);
          });
      })
      .catch((err) => {
        console.log('books deletion err', err);
      });
  }

  const books = booksInList.map((book) => (
    <div key={book.book_id}>
      <div className="border-b border-gray-200 border-solid" />
      <div className="p-6 flex items-center">
        <div className="w-16 mr-6">
          <img
            className="object-cover w-full"
            src={book.image_url || bookImg}
            alt={book.title}
          />
        </div>
        <div className="w-full text-sm">
          <span className="font-medium">{book.title}</span>
          <br />
          <span className="text-gray-500">{book.author}</span>
        </div>
        <Rating placeholderRating="4/5" />
      </div>
    </div>
  ));

  return (
    <div className="w-full bg-white rounded-bl-md rounded-br-md shadow-md">
      <div className="border-b border-red-300 border-solid">
        <div className="relative p-6 flex justify-between items-center">
          <button
            type="button"
            className="absolute top-0 left-0 mt-1 ml-3 cursor-pointer"
            onClick={deleteListHandler}
            onKeyPress={(e) => e.key === 'Enter' && deleteListHandler()}
            aria-label={`delete list ${listName}`}
          >
            X
          </button>
          <h3 className="font-medium text-xl">{listName}</h3>
          <div className="flex items-center gap-2">
            add book{' '}
            <Link
              to="/add-book"
              className="rounded-full bg-white shadow-md border-solid border-gray-200"
            >
              <BookIcon />
            </Link>
          </div>
        </div>
      </div>
      <div className="">{books}</div>
    </div>
  );
};

export default List;
