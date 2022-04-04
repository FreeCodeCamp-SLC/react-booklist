import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { loadAuthToken } from '../utils/local-storage';
import API_BASE_URL from '../config';
import axios from 'axios';

export default function BookPage() {
  const book = useLocation().state.book;
  console.log(book);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [pages, setPages] = useState(book.pages);
  const image = book.image_url;
  const [readingStatusId, setReadingStatusId] = useState(
    book.reading_status_id,
  );
  const [dateStarted, setDateStarted] = useState(book.date_started);
  const [dateFinished, setDateFinished] = useState(book.date_finished);
  const listId = book.list_id;
  const bookId = book.book_id;

  const history = useHistory();

  const readingStatusArray = [
    'To Read',
    'Currently Reading',
    'On Hold',
    'Finished',
    'Abandoned',
  ];
  function editBook(e) {
    e.preventDefault();
    const authToken = loadAuthToken();

    const bookDetails = {
      list_id: listId,
      title,
      author,
      pages,
      image_url: image,
      reading_status_id: readingStatusId ?? 0,
    };
    if (dateStarted) bookDetails.date_started = dateStarted;
    if (dateFinished) bookDetails.date_finished = dateFinished;
    console.log(readingStatusId);
    console.log(bookDetails);
    axios
      .put(`${API_BASE_URL}/books/${bookId}`, bookDetails, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        history.push('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className=" sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      <div className="min-h-full col-start-2 row-start-2 bg-gray-100 ">
        <div className="flex pt-5 justify-between items-center">
          <h2 className="px-4 text-3xl font-bold text-gray-900 ">Edit Book</h2>
        </div>
        <div className="mx-5 overflow-hidden rounded-md shadow-md mt-7 bg-white">
          <form className="flex flex-col px-5 pt-5 pb-2 bg-white" id="new book">
            <label className="flex flex-col my-3" htmlFor="title">
              Title
            </label>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
              type="text"
              id="title"
              name="Title"
              value={title ?? 'Missing Title'}
              required
            />
            <label className="flex flex-col my-3" htmlFor="author">
              Author
            </label>
            <input
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
              type="text"
              id="author"
              name="Author"
              value={author ?? 'Missing Author'}
              required
            />
            <label className="flex flex-col my-3" htmlFor="pages">
              Pages
            </label>
            <input
              onChange={(e) => {
                setPages(e.target.value);
              }}
              className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
              type="number"
              id="pages"
              name="Pages"
              value={pages ?? 0}
              required
            />
            <div className="flex justify-center py-4">
              <img src={image} alt="book cover" className="w-32" />
            </div>
            <label className="flex flex-col my-3" htmlFor="reading-status">
              Reading Status
            </label>
            <select
              name="Reading Status Id"
              id="reading-status"
              className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
              defaultValue={readingStatusArray[readingStatusId]}
              onChange={(e) => {
                setReadingStatusId(Number(e.target.value));
              }}
            >
              {console.log(readingStatusArray)}
              {console.log(readingStatusId)}
              {/* {console.log(readingStatusArray[readingStatusId].name)} */}
              <option value={'default'} selected disabled hidden>
                {readingStatusArray[readingStatusId]}
              </option>
              <option value={0}>To Read</option>
              <option value={1}>Currently Reading</option>
              <option value={2}>On Hold</option>
              <option value={3}>Finished</option>
              <option value={4}>Abandoned</option>
            </select>
            <label className="flex flex-col my-3" htmlFor="date-started">
              Date Started
            </label>
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
            <label className="flex flex-col my-3" htmlFor="date-finished">
              Date Finished
            </label>
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
          </form>
          <div className="flex items-center h-16 bg-gray-50 ">
            <button
              className="h-10 ml-4 font-semibold text-white rounded-md bg-booklistBlue-dark w-28"
              type="submit"
              form="new book"
              onClick={editBook}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
