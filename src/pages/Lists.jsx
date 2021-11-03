import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useListsApi from '../hooks/useListsApi';
import Header from '../components/Header';

export default function Lists() {
  const { getAllLists } = useListsApi();
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
      <div className="grid grid-cols-1 pb-6 mx-6 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div>
          {lists.map((list) => (
            <p key={list.list_id}>{list.name}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className=" sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      <div className="min-h-screen col-start-2 row-start-2 bg-gray-100 ">
        <div className="flex pt-5 justify-between items-center">
          <h2 className="px-4 text-3xl font-bold text-gray-900 ">Lists</h2>
          <div className="flex flex-col items-center">
            <Link className="text-booklistBlue-dark" to="add-list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 "
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
            <span>New List</span>
          </div>
        </div>
        {series}
        <div className="mx-5 overflow-hidden rounded-md shadow-md mt-7" />
      </div>
    </section>
  );
}
