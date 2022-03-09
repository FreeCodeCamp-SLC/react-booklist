import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { loadAuthToken } from '../utils/local-storage';
import API_BASE_URL from '../config';

export default function AddListPage() {
  const [listName, setName] = useState('');
  const [listYear, setYear] = useState(0);
  const [yearValid, setYearValid] = useState(true);

  const history = useHistory();

  function addList(e) {
    e.preventDefault();

    const authToken = loadAuthToken();
    const yearNum = +listYear;

    if (yearNum <= 0) {
      setYearValid(false);
      return;
    }
    axios
      .post(
        `${API_BASE_URL}/lists`,
        {
          name: listName,
          year: yearNum,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      .then(() => {
        history.push('/lists');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className=" sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      <div className="min-h-full col-start-2 row-start-2 bg-gray-100 ">
        <h2 className="px-4 pt-5 text-3xl font-bold text-gray-900 ">
          Create New Collection
        </h2>
        <div className="mx-5 overflow-hidden rounded-md shadow-md mt-7">
          <form className="flex flex-col px-5 pt-5 pb-2 bg-white" id="new book">
            <label className="my-3" htmlFor="Book Title">
              Series / Collection Name
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-full border-2"
                type="text"
                id="name"
                name="name"
                value={listName}
                required
              />
            </label>
            <label className="my-3" htmlFor="Series">
              Year
              <input
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                className="w-full border-2"
                type="number"
                name="Year"
                id="Year"
                value={listYear}
              />
              {!yearValid && (
                <span className="text-red-500">
                  Year must be a positive integer
                </span>
              )}
            </label>
            <div className="flex items-center h-16 bg-gray-50 ">
              <button
                className="h-10 ml-4 font-semibold text-white rounded-md bg-booklistBlue-dark w-28"
                type="submit"
                form="new book"
                onClick={addList}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
