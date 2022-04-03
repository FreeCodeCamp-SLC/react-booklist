import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function BookPage() {
  const book = useLocation().state.book;
  console.log(book);
  const [title, setTitle] = useState(book.title ?? 'Missing Title');
  const [author, setAuthor] = useState(book.author ?? 'Missing Author');
  const [pages, setPages] = useState(book.pages ?? 0);
  const image = book.image_url;
  const [readingState, setReadingState] = useState(
    book.reading_status_id ?? 'To Read',
  );
  const [dateStarted, setDateStarted] = useState(book.date_started ?? '');
  const [dateFinished, setDateFinished] = useState(book.date_finished ?? '');
  const [createdOn, setCreatedOn] = useState(book.created_on ?? '');
  const [modifiedOn, setModifiedOn] = useState(book.modified_on ?? '');
  const listId = book.list_id;

  //all these "nulls" should have a way to be edited...
  // first lets just have it show the book title and image...
  //

  //maybe it will show you title, img, and author, and then as you edit those things it changes...
  // or maybe just a list of forms?
  // i think including the image is nice if I can...
  // look at the way that 'add new' included the image. you can probably just copy that...

  // allow them to edit 'date finished', 'date started', 'reading status id'
  // modified on will auto update
  // as well as 'created on'

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
              value={title}
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
              value={author}
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
              value={pages}
              required
            />
            <div className="flex justify-center py-4">
              <img src={image} alt="book cover" className="w-32" />
            </div>
            <label className="flex flex-col my-3" htmlFor="reading-status">
              Reading Status
            </label>
            <select
              name="Reading Status"
              id="reading-status"
              className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
            >
              <option value={'To Read'}>To Read</option>
              <option value={'Currently Reading'}>Currently Reading</option>
              <option value={'On Hold'}>On Hold</option>
              <option value={'Finished'}>Finished</option>
              <option value={'Abandoned'}>Abandoned</option>
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
              value={dateStarted}
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
              value={dateFinished}
            />
            <label className="flex flex-col my-3" htmlFor="created-on">
              Created On
            </label>
            <input
              onChange={(e) => {
                setCreatedOn(e.target.value);
              }}
              className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
              type="date"
              id="created-on"
              name="Created On"
              value={createdOn}
            />
            <label className="flex flex-col my-3" htmlFor="modified-on">
              Modified On
            </label>
            <input
              onChange={(e) => {
                setModifiedOn(e.target.value);
              }}
              className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
              type="date"
              id="modified-on"
              name="Modified On"
              value={modifiedOn}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
