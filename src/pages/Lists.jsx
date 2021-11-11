import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import useListsApi from '../hooks/useListsApi';
import Header from '../components/Header';
import useBooksApi from '../hooks/useBooksApi';
import List from '../components/List.jsx';

export default function Lists() {
  const { getAllLists } = useListsApi();
  const { getAllBooks } = useBooksApi();
  const [books, setBooks] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const getLists = async () => {
      try {
        const data = await getAllLists();
        setLists(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    await getLists();
  }, []);

  useEffect(async () => {
    const getBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    await getBooks();    
  }, []);

  useEffect(() => {
    if (lists) {
      setLoading(false);
    }
  }, [lists]);

  let series;
  if (loading) {
    series = null;
  } else {
    series = (
      <div className="grid grid-cols-1 pb-6 mx-6 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {lists.map((list) => (
            <List key={list.list_id} listName={list.name} booksInList={books.filter(book=> book.list_id === list.list_id)}/>
          ))}
      </div>
    );
  }

  return (
    <section className="sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      <div className="min-h-screen col-start-2 row-start-2 bg-gray-100 ">
        <div className="flex py-5 px-6 justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Lists</h2>
          <div className="flex flex-col items-center">
            <Link className="text-booklistBlue-dark" to="add-list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
            <span className="text-sm">new list</span>
          </div>
        </div>
        {series}
        <div className="mx-5 overflow-hidden rounded-md shadow-md mt-7" />
      </div>
    </section>
  );
}


