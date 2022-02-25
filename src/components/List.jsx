import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bookImg from '../images/book.png';
import BookIcon from './BookIcon';
import Rating from './Rating';
import API_BASE_URL from '../config';
import { loadAuthToken } from '../utils/local-storage';
import ConfirmationModal from './ConfirmationModal';

const List = ({ id, listName, booksInList, getBooks, getLists }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function deleteListHandler() {
    const authObject = {
      headers: {
        Authorization: `Bearer ${loadAuthToken()}`,
      },
    };
    try {
      await Promise.all(
        booksInList.map((book) =>
          axios.delete(`${API_BASE_URL}/books/${book.book_id}`, authObject),
        ),
      );
      await axios.delete(`${API_BASE_URL}/lists/${id}`, authObject);
    } catch (err) {
      console.log('list deletion err', err);
    } finally {
      getBooks();
      getLists();
      setModalIsOpen(false);
    }
  }

  function showModal() {
    setModalIsOpen(true);
    // deleteListHandler();
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
            className="absolute top-0 left-0 mt-1.5 ml-1.5"
            onClick={showModal}
            onKeyPress={(e) => e.key === 'Enter' && showModal}
            aria-label={`delete list ${listName}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-booklistRed-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
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
      {modalIsOpen && (
        <ConfirmationModal
          className="text-center"
          setModalIsOpen={setModalIsOpen}
        >
          <h2 className="text-2xl">
            Are you sure you want to delete list {listName}?
          </h2>
          <div>
            <p className="text-xl my-4">
              deleting this list will also remove the following books from your
              collection:
            </p>
            <ul className="flex flex-col">
              {booksInList.map((book) => (
                <li key={book.book_id}>{book.title}</li>
              ))}
            </ul>
          </div>
          <button
            className="bg-booklistRed-dark text-white font-semibold shadow-md rounded-xl py-1.5 px-4 mt-8"
            onClick={deleteListHandler}
            onKeyPress={(e) => e.key === 'Enter' && deleteListHandler}
            type="button"
          >
            Delete List
          </button>
        </ConfirmationModal>
      )}
    </div>
  );
};

export default List;
