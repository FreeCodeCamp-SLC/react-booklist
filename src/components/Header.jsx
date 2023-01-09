import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import useProfile from '../hooks/useProfileApi';

export default function Header({ searchHandler }) {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth0();

  const [toggle, setToggle] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { data: profileData } = useProfile();

  let homeButton = (
    <Link to="/">
      <li className="p-1 focus:bg-booklistBlue-dark">Home</li>
    </Link>
  );

  let profile = null;
  let addBook = null;
  let lists = null;
  let favorites = null;

  if (isAuthenticated) {
    homeButton = (
      <li
        className={`items-center p-1 focus:bg-booklistBlue-dark rounded-md py-2 ${
          pathname === '/dashboard' && 'bg-booklistBlue-dark'
        }`}
      >
        <Link className="flex" to="/dashboard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Dashboard
        </Link>
      </li>
    );
    profile = (
      <li
        className={`items-center p-1 focus:bg-booklistBlue-dark rounded-md py-2 ${
          pathname === '/profile' && 'bg-booklistBlue-dark'
        }`}
      >
        <Link className="flex" to="/profile">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Profile
        </Link>
      </li>
    );
    addBook = (
      <li
        className={`items-center p-1 focus:bg-booklistBlue-dark rounded-md py-2 ${
          pathname === '/add-book' && 'bg-booklistBlue-dark'
        }`}
      >
        <Link className="flex" to="/add-book">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
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
          Add Book
        </Link>
      </li>
    );
    lists = (
      <li
        className={`items-center p-1 focus:bg-booklistBlue-dark rounded-md py-2 ${
          pathname === '/lists' && 'bg-booklistBlue-dark'
        }`}
      >
        <Link className="flex" to="/lists">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Lists
        </Link>
      </li>
    );
    favorites = (
      <li
        className={`items-center p-1 focus:bg-booklistBlue-dark rounded-md py-2 ${
          pathname === '/favorites' && 'bg-booklistBlue-dark'
        }`}
      >
        <Link className="flex" to="/favorites">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          Favorites
        </Link>
      </li>
    );
  }

  return (
    <>
      <div className="relative z-50 flex justify-between col-span-2 px-2 pt-5 pb-4 items-center bg-white shadow-md sm:col-start-2 sm:col-span-1">
        <div className="flex items-center">
          <button
            type="button"
            className="mx-2 min-w-max focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() => setToggle(!toggle)}
          >
            <svg
              className="text-gray-500 fill-current h-7 sm:hidden"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
            </svg>
          </button>
          {(pathname === '/dashboard' ||
            pathname === '/lists' ||
            pathname === '/favorites') && (
            <>
              <svg
                className="h-5 px-2 stroke-current text-booklistBlue-dark"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <form action="/" method="GET">
                <label htmlFor="search">
                  <input
                    className="text-lg text-booklistBlue-dark focus:outline-none"
                    onChange={(e) => {
                      searchHandler(e.target.value);
                      setSearchValue(e.target.value);
                    }}
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search"
                    value={searchValue}
                  />
                </label>
              </form>
            </>
          )}
        </div>
        <div className="z-10 flex min-w-max">
          {profileData?.data[0]?.image_url ? (
            <Link className="flex" to="/profile">
              <img
                src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/ar_1:1,b_rgb:ffffff,bo_3px_solid_rgb:195885,c_thumb,g_face:center,r_max,w_40/${profileData?.data[0]?.image_url}`}
                alt=""
                id="profileImg"
              />
            </Link>
          ) : (
            <Link className="flex" to="/profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
      {/* desktop */}
      <header className="hidden min-h-screen col-start-1 row-span-2 row-start-1 sm:inline bg-booklistBlue z-50">
        <nav className="m-2 text-lg font-semibold text-white">
          <ul>
            {homeButton}
            {profile}
            {favorites}
            {lists}
            {addBook}
            <LoginButton />
            <LogoutButton />
          </ul>
        </nav>
      </header>
      {/* mobile */}
      <header
        className={`
        col-start-1 absolute top-16 sm:hidden w-screen bg-booklistBlue transform transition z-40
          ${!toggle ? '-translate-y-full transparent' : 'translate-y-0'}
        `}
      >
        <nav className="flex m-2 text-lg font-semibold text-white">
          <ul className="w-full">
            {homeButton}
            {profile}
            {favorites}
            {lists}
            {addBook}
            <LoginButton />
            <LogoutButton />
          </ul>
        </nav>
      </header>
    </>
  );
}
