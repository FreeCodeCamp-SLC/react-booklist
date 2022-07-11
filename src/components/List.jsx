import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bookImg from '../images/book.png';
import BookIcon from './BookIcon';
import Rating from './Rating';
import ConfirmationModal from './ConfirmationModal';
import { useDeleteList, useDeleteAllBooks } from '../hooks/useListsApi';

const List = ({ id, list, booksInList, refetchLists, refetchBooks }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const deleteList = useDeleteList(id, setModalIsOpen);
  const deleteAllBooks = useDeleteAllBooks(booksInList);

  const deleteListHandler = async () => {
    try {
      await deleteAllBooks.mutateAsync();
      await deleteList.mutateAsync();
      refetchLists();
      refetchBooks();
    } catch {
      console.log('error deleting list');
    }
  };

  function showModal() {
    if (booksInList.length > 0) {
      document.body.style.overflowY = 'hidden';
      setModalIsOpen(true);
    } else {
      deleteListHandler();
    }
  }

  const books = booksInList.map((book) => {
    let isFavorite = 'false';
    if (book.favorite) {
      isFavorite = 'true';
    }
    return (
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
            <br />
            <span>Favorite: {isFavorite}</span>
          </div>
          <Rating placeholderRating="4/5" />
        </div>
      </div>
    );
  });

  return (
    <div id={id} className="h-fit w-full bg-white rounded-md shadow-md">
      <div className="border-b border-red-300 border-solid">
        <div className="relative p-6 flex justify-between items-center">
          <button
            type="button"
            className="absolute top-0 left-0 mt-1.5 ml-1.5"
            onClick={showModal}
            onKeyPress={(e) => e.key === 'Enter' && showModal}
            aria-label={`delete list ${list.name}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-booklistRed hover:text-booklistRed-light active:text-booklistRed-dark"
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

          <h3 className="font-medium text-xl">
            {list.name}
            <span className="text-gray-500 font-medium"> - {list.year}</span>
          </h3>

          <div className="flex items-center gap-2">
            add book
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
          {deleteList.isLoading && <h2>Deleting List...</h2>}
          {!deleteList.isLoading && (
            <>
              <h2 className="text-2xl">
                Are you sure you want to delete collection {list.name}?
              </h2>
              <div>
                <p className="text-xl my-4">
                  Deleting this collection will also remove the following books
                  from your collection:
                </p>
                <ul className="flex flex-col">
                  {booksInList.map((book) => (
                    <li key={book.book_id}>{book.title}</li>
                  ))}
                </ul>
              </div>
              <button
                className="bg-booklistRed active:bg-booklistRed-dark hover:bg-booklistRed-light hover:-translate-y-0.5 text-white font-semibold shadow-md rounded-xl py-1.5 px-4 mt-8 transform transition"
                onClick={deleteListHandler}
                onKeyPress={(e) => e.key === 'Enter' && deleteListHandler}
                type="button"
              >
                Delete Collection
              </button>
            </>
          )}
        </ConfirmationModal>
      )}
    </div>
  );
};

export default List;
