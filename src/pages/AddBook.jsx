import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import useListsApi from '../hooks/useListsApi';
import { useAddBook } from '../hooks/useBooksApi';

import CustomDropdown from '../components/customDropdown/CustomDropdown';
import ConfirmationModal from '../components/ConfirmationModal';
import logo from '../images/logo.png';

export default function AddBookPage() {
  const history = useHistory();
  const { data: lists } = useListsApi();
  const { mutate: addBook, isLoading, isError } = useAddBook(history);
  const [title, setTitle] = useState('');
  const [pages, setPages] = useState('');
  const [author, setAuthor] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [listId, setListId] = useState(0);
  const [bookSelection, setBookSelection] = useState([]);
  const [bookImage, setBookImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function addBookHandler(e) {
    e.preventDefault();
    const bookDetails = {
      list_id: +listId || +lists?.data[0].list_id,
      title,
      image_url: bookImage,
    };

    if (pages) {
      bookDetails.pages = pages;
    }
    if (author) {
      bookDetails.author = author;
    }
    if (favorite) {
      bookDetails.favorite = favorite;
    }
    addBook(bookDetails);
  }
  function autofillBookInfo(book) {
    if (!book.volumeInfo.authors) {
      setAuthor('');
    } else {
      setAuthor(book.volumeInfo.authors.map((a) => a).join(', '));
    }
    if (!book.volumeInfo.pageCount) {
      setPages('');
    } else {
      setPages(book.volumeInfo.pageCount);
    }
    if (!book.volumeInfo.imageLinks.thumbnail) {
      setBookImage(null);
    } else {
      setBookImage(book.volumeInfo.imageLinks.thumbnail);
    }
    setTitle(book.volumeInfo.title);
  }

  function searchBooks(query) {
    if (query.length > 2) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then((res) => {
          setBookSelection(res.data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setBookSelection(null);
    }
  }

  function goToListsPage() {
    document.body.style.overflowY = 'visible';
    history.push('/lists');
  }

  return (
    <section className=" sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      {!isLoading && !isError && (
        <div className="min-h-full col-start-2 row-start-2 bg-gray-100 ">
          <h2 className="px-4 pt-5 text-3xl font-bold text-gray-900 ">
            Add New
          </h2>
          <div className="mx-5 rounded-md shadow-md mt-7">
            <form
              className="flex flex-col px-5 pt-5 pb-2 bg-white"
              id="new book"
            >
              <label className="my-3" htmlFor="Book-Title">
                Book Title
                <CustomDropdown
                  name="Book-Title"
                  searchBooks={searchBooks}
                  bookSelection={bookSelection}
                  autofillBookInfo={autofillBookInfo}
                  setBookSelection={setBookSelection}
                />
              </label>

              <label className="my-3" htmlFor="Author">
                Author(s)
                <input
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                  className="w-full mt-1 border-2 py-1.5 px-2 rounded-md"
                  type="text"
                  name="Author"
                  id="Author"
                  value={author}
                  required
                />
              </label>

              <label className="my-3 flex flex-col" htmlFor="Pages">
                Pages
                <input
                  onChange={(e) => {
                    setPages(e.target.value);
                  }}
                  className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
                  type="number"
                  id="pages"
                  name="Pages"
                  value={pages}
                  required
                />
              </label>

              {bookImage && (
                <div className="flex justify-center py-4">
                  <img src={bookImage} alt="book cover" className="w-32" />
                </div>
              )}
              <label className="flex flex-col my-3" htmlFor="Favorite">
                Favorite
                <div className="text-gray-500">
                  Add this book to your list of favorites
                </div>
                <input
                  onChange={(e) => {
                    setFavorite(e.target.checked);
                  }}
                  className="w-5 mt-1"
                  checked={favorite}
                  type="checkbox"
                  name="Favorite"
                  id="Favorite"
                />
              </label>
              <label className="my-3" htmlFor="Series">
                List
                {lists?.data.length > 0 && (
                  <select
                    onChange={(e) => {
                      setListId(e.target.value);
                    }}
                    className="w-full border-2 py-1.5 px-2 rounded-md"
                    name="Series"
                    id="Series"
                    value={listId}
                  >
                    {lists?.data.map((item) => (
                      <option value={item.list_id} key={item.list_id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
              </label>
            </form>

            <div className="flex items-center h-16 bg-gray-50 ">
              <button
                className="h-10 ml-4 font-semibold text-white rounded-md bg-booklistBlue-dark w-28"
                type="submit"
                form="new book"
                onClick={addBookHandler}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading && <h2 className="px-6 py-4">Loading...</h2>}
      {isError && <h2 className="px-6 py-4">Error Adding Book</h2>}
      {modalIsOpen && (
        <ConfirmationModal setModalIsOpen={setModalIsOpen} modalCannotClose>
          <div className="flex justify-center w-full pb-6">
            {' '}
            <img src={logo} alt="logo" />
          </div>

          <h2 className="text-2xl">
            You must create at least one collection before you begin adding
            books.
          </h2>
          <button
            className="text-white font-semibold shadow-md rounded-xl hover:-translate-y-0.5 active:bg-booklistBlue-dark transform transition bg-booklistBlue hover:bg-booklistBlue-light py-1.5 px-4 mt-10 mb-4"
            onClick={goToListsPage}
            onKeyPress={(e) => e.key === 'Enter' && goToListsPage}
            type="button"
          >
            Create Collection
          </button>
        </ConfirmationModal>
      )}
    </section>
  );
}
