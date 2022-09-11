import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useGetAllLists } from '../hooks/useListsApi';
import Header from '../components/Header';
import api from '../config';
import ConfirmationModal from '../components/ConfirmationModal';
import RatingStars from '../components/RatingStars';
import PageContext from '../contexts/page-context';

function convertDate(date) {
  if (date) return date.substring(0, 10);
}

export default function BookPage() {
  const { book } = useLocation().state;
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [pages, setPages] = useState(book.pages);
  const [bookmark, setBookmark] = useState(
    book.bookmark_page ? book.bookmark_page : 1,
  );
  const [starRating, setStarRating] = useState(book.rating);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [favorite, setFavorite] = useState(book.favorite);
  const [readingStatusId, setReadingStatusId] = useState(
    book.reading_status_id,
  );
  const [listId, setListId] = useState(book.list_id);
  const [dateStarted, setDateStarted] = useState(
    convertDate(book.date_started),
  );
  const [dateFinished, setDateFinished] = useState(
    convertDate(book.date_finished),
  );
  const { data: lists } = useGetAllLists();
  const bookId = book.book_id;
  const image = book.image_url;
  const history = useHistory();

  function editBook(e) {
    e.preventDefault();
    const bookDetails = {
      list_id: listId,
      title,
      author,
      pages,
      favorite,
      bookmark_page: bookmark,
      rating: starRating,
      image_url: image,
      reading_status_id: readingStatusId ?? 1,
    };
    if (dateStarted) bookDetails.date_started = dateStarted;
    if (dateFinished) bookDetails.date_finished = dateFinished;
    api
      .put(`/books/${bookId}`, bookDetails)
      .then(() => {
        history.push('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteBook(e) {
    e.preventDefault();
    api
      .delete(`/books/${bookId}`)
      .then(() => {
        history.push('/dashboard');
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  function showModal() {
    setModalIsOpen(true);
  }

  return (
    <>
      <section className=" sm:grid grid-cols-layout grid-rows-layout">
        <Header />
        <div className="min-h-full col-start-2 row-start-2 bg-gray-100 ">
          <div className="flex pt-5 justify-between items-center">
            <h2 className="px-4 text-3xl font-bold text-gray-900 ">
              Edit Book
            </h2>
          </div>
          <div className="mx-5 overflow-hidden rounded-md shadow-md mt-7 bg-white">
            <form
              className="flex flex-col px-5 pt-5 pb-2 bg-white"
              id="new book"
            >
              <label className="flex flex-col my-3" htmlFor="title">
                Title
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="w-full mt-1 border-2 py-1.5 px-2 rounded-md"
                  type="text"
                  id="title"
                  name="Title"
                  value={title ?? 'Missing Title'}
                  required
                />
              </label>

              <label className="flex flex-col my-3" htmlFor="author">
                Author
                <input
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                  className="w-full mt-1 border-2 py-1.5 px-2 rounded-md"
                  type="text"
                  id="author"
                  name="Author"
                  value={author ?? 'Missing Author'}
                  required
                />
              </label>

              <label className="flex flex-col my-3" htmlFor="pages">
                Pages
                <input
                  onChange={(e) => {
                    setPages(Number(e.target.value));
                  }}
                  className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
                  type="number"
                  id="pages"
                  name="Pages"
                  value={pages ?? 0}
                  required
                />
              </label>
              <label className="flex flex-col my-3" htmlFor="bookmark">
                Current Bookmark Page
                <input
                  onChange={(e) => {
                    setBookmark(Number(e.target.value));
                  }}
                  className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
                  type="number"
                  id="bookmark"
                  name="Bookmark"
                  value={bookmark ?? 0}
                  required
                />
              </label>
              <RatingStars
                rating={book.rating}
                bookId={book.book_id}
                starRating={starRating}
                setStarRating={setStarRating}
                isEditPage
              />

              <div className="flex justify-center py-4">
                <img src={image} alt="book cover" className="w-32" />
              </div>
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

              <label className="flex flex-col my-3" htmlFor="reading-status">
                Reading Status
                <select
                  name="Reading Status Id"
                  id="reading-status"
                  className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
                  value={readingStatusId ?? 1}
                  onChange={(e) => {
                    setReadingStatusId(Number(e.target.value));
                  }}
                >
                  <option value={1}>To Read</option>
                  <option value={2}>Currently Reading</option>
                  <option value={3}>On Hold</option>
                  <option value={4}>Finished</option>
                  <option value={5}>Abandoned</option>
                </select>
              </label>

              <label className="flex flex-col my-3" htmlFor="Series">
                List
                {lists?.data.length > 0 && (
                  <select
                    onChange={(e) => {
                      setListId(parseInt(e.target.value));
                    }}
                    className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
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

              <label className="flex flex-col my-3" htmlFor="date-started">
                Date Started
                <input
                  onChange={(e) => {
                    setDateStarted(e.target.value);
                  }}
                  className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
                  type="date"
                  id="date-started"
                  name="Date Started"
                  value={dateStarted ?? ''}
                />
              </label>

              <label className="flex flex-col my-3" htmlFor="date-finished">
                Date Finished
                <input
                  onChange={(e) => {
                    setDateFinished(e.target.value);
                  }}
                  className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
                  type="date"
                  id="date-finished"
                  name="Date Finished"
                  value={dateFinished ?? ''}
                />
              </label>
            </form>
            <div className="flex items-center h-16 bg-gray-50 ">
              <button
                className="h-10 ml-4 font-semibold text-white rounded-md bg-booklistBlue-dark w-28"
                type="submit"
                form="new book"
                onClick={editBook}
                aria-label={`save book ${title}`}
              >
                Save
              </button>
              <button
                type="button"
                className="h-10 ml-4 font-semibold text-white rounded-md bg-booklistRed-dark w-28"
                onClick={showModal}
                onKeyPress={(e) => e.key === 'Enter' && showModal}
                aria-label={`delete book ${title}`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>
      {modalIsOpen && (
        <ConfirmationModal
          className="text-center"
          setModalIsOpen={setModalIsOpen}
        >
          <>
            <h2 className="text-2xl">
              Are you sure you want to delete the book "{title}"?
            </h2>
            <button
              className="bg-booklistRed active:bg-booklistRed-dark hover:bg-booklistRed-light hover:-translate-y-0.5 text-white font-semibold shadow-md rounded-xl py-1.5 px-4 mt-8 transform transition"
              onClick={deleteBook}
              onKeyPress={(e) => e.key === 'Enter' && deleteBook}
              type="button"
              aria-label={`confirm deletion of book ${title}`}
            >
              Delete Book
            </button>
          </>
        </ConfirmationModal>
      )}
    </>
  );
}
