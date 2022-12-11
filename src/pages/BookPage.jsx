import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useGetAllLists } from '../hooks/useListsApi';
import Header from '../components/Header';
import ConfirmationModal from '../components/ConfirmationModal';
import RatingStars from '../components/RatingStars';
import { useDeleteBook, useEditBook } from '../hooks/useBooksApi';
import Googlebooks from '../images/google-books.png';

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
  const [description, setDescription] = useState(book.description);
  const { data: lists } = useGetAllLists();
  const { mutate: deleteBook } = useDeleteBook();
  const { mutate: editBook } = useEditBook();

  const image = book.image_url;

  function editBookHandler(e) {
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
      book_id: book.book_id,
    };
    if (dateStarted) bookDetails.date_started = dateStarted;
    if (dateFinished) bookDetails.date_finished = dateFinished;
    editBook(bookDetails);
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
                Author(s)
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
              <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2">
                {' '}
                <div>
                  <label className="flex flex-col my-3" htmlFor="pages">
                    Pages
                    <input
                      onChange={(e) => {
                        setPages(Number(e.target.value));
                      }}
                      className="w-full mt-1 md:w-48 border-2 py-1.5 px-2 rounded-md"
                      type="number"
                      id="pages"
                      name="Pages"
                      value={pages ?? 0}
                      required
                    />
                  </label>
                </div>
                <label className="flex flex-col my-3" htmlFor="bookmark">
                  Current Bookmark Page
                  <input
                    onChange={(e) => {
                      setBookmark(Number(e.target.value));
                    }}
                    className="w-full mt-1 md:w-48 border-2 py-1.5 px-2 rounded-md"
                    type="number"
                    id="bookmark"
                    name="Bookmark"
                    value={bookmark ?? 0}
                    required
                  />
                </label>
                <label className="flex flex-col my-3" htmlFor="date-started">
                  Date Started
                  <input
                    onChange={(e) => {
                      setDateStarted(e.target.value);
                    }}
                    className="w-full mt-1 md:w-48 border-2 py-1.5 px-2 rounded-md"
                    type="date"
                    id="date-started"
                    name="Date Started"
                    value={dateStarted ?? ''}
                  />
                </label>
                <label className="flex flex-col my-3" htmlFor="date_finished">
                  Date Finished
                  <input
                    onChange={(e) => {
                      setDateFinished(e.target.value);
                    }}
                    className="w-full mt-1 md:w-48 border-2 py-1.5 px-2 rounded-md"
                    type="date"
                    id="date_finished"
                    name="Date Finished"
                    value={dateFinished ?? ''}
                  />
                </label>
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1">
                <div className="">
                  <label
                    className="flex flex-col my-4"
                    htmlFor="reading_status"
                  >
                    Reading Status
                    <select
                      name="Reading Status Id"
                      id="reading_status"
                      className="w-full mt-1 md:w-48 border-2 py-1.5 px-2 rounded-md"
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
                  <label className="flex flex-col pt-1 my-4" htmlFor="favorite">
                    Favorite
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                        type="checkbox"
                        role="switch"
                        name="favorite"
                        id="flexSwitchCheckChecked76"
                        onChange={(e) => {
                          setFavorite(e.target.checked);
                        }}
                        checked={favorite}
                      />
                    </div>
                  </label>
                  <span className="flex flex-col pt-1 my-4">
                    Your Rating
                    <RatingStars
                      book={book}
                      starRating={starRating}
                      setStarRating={setStarRating}
                      isEditPage
                    />
                  </span>
                </div>
                <div className="flex flex-col mt-1 mb-3">
                  <span className="mb-1">Book Cover</span>
                  <img src={image} alt="book cover" className="w-32" />
                </div>
              </div>
              <label className="flex flex-col my-3" htmlFor="description">
                Description
                <textarea
                  className="w-full mt-1 border-2 py-1.5 px-2 rounded-md"
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  maxLength="2000"
                  value={description}
                />
              </label>
              <div className="grid md:grid-cols-2 grid-cols-1">
                <label className="flex flex-col my-3" htmlFor="Series">
                  List
                  {lists?.data.length > 0 && (
                    <select
                      onChange={(e) => {
                        setListId(parseInt(e.target.value));
                      }}
                      className="w-full mt-1 md:w-72 border-2 py-1.5 px-2 rounded-md"
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
                <div className="my-3">
                  <span>Purchase Or Preview On</span>
                  <Link to={{ pathname: book?.google_link }} target="_blank">
                    <img
                      src={Googlebooks}
                      alt="google books logo"
                      className="w-36 mt-1"
                    />
                  </Link>
                </div>
              </div>
            </form>

            <div className="flex items-center h-16 bg-gray-50 ">
              <button
                className="h-10 ml-4 font-semibold text-white rounded-md bg-booklistBlue-dark w-28"
                type="submit"
                form="new book"
                onClick={editBookHandler}
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
              onClick={() => deleteBook(book)}
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
