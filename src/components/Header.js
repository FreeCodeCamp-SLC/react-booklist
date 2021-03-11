import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth-context";
import { clearAuthToken } from "../utils/local-storage";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  function logout() {
    clearAuthToken();
    setUser(null);
  }
  // state for nav toggle
  const [toggle, setToggle] = useState(false);
  // state for two-way binding of search input
  const [searchValue, setSearchValue] = useState("Search");

  return (
    <>
      <div className="col-span-2 flex justify-between pt-5 pb-4 px-2 z-30 relative bg-white">
        <div className="flex items-center">
          <button
            className="min-w-max mx-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() => setToggle(!toggle ? true : false)}
          >
            <svg
              className="h-7  fill-current text-gray-500  sm:hidden"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
            </svg>
          </button>
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
            <label for="search"></label>
            <input
              className="text-lg text-booklistBlue-dark focus:outline-none"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              type="text"
              name="search"
              id="search"
              value={searchValue}
            />
          </form>
        </div>
        <div className="flex min-w-max z-10">
          <svg
            className="h-7  px-2 stroke-current text-booklistBlue-dark"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <svg
            className="h-7  px-2 stroke-current text-booklistBlue-dark"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <header className="col-start-1 hidden sm:inline bg-booklistBlue">
        <nav className="m-2 text-white text-lg font-semibold">
          <ul>
            <li>
              <Link className="p-1  focus:bg-booklistBlue-dark" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="p-1 focus:bg-booklistBlue-dark" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="p-1 focus:bg-booklistBlue-dark" to="/tailwind">
                Tailwind
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link className="p-1 focus:bg-booklistBlue-dark" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="p-1 focus:bg-booklistBlue-dark" to="/register">
                Register
              </Link>
            </li>
            <button
              className="font-semibold p-1 focus:bg-booklistBlue-dark"
              onClick={logout}
            >
              Logout
            </button>
          </ul>
        </nav>
      </header>
      <header
        className={`
        col-start-1 absolute top-16 sm:hidden w-screen bg-booklistBlue transform transition z-20
          ${!toggle ? "-translate-y-full transparent" : "translate-y-0"}
        `}
      >
        <nav className="m-2 text-white text-lg font-semibold text-center">
          <ul>
            <li>
              <Link className="p-1  focus:bg-booklistBlue-dark" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="p-1 focus:bg-booklistBlue-dark" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="p-1 focus:bg-booklistBlue-dark" to="/tailwind">
                Tailwind
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link className="p-1 focus:bg-booklistBlue-dark" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="p-1 focus:bg-booklistBlue-dark" to="/register">
                Register
              </Link>
            </li>
            <button
              className="font-semibold p-1 focus:bg-booklistBlue-dark"
              onClick={logout}
            >
              Logout
            </button>
          </ul>
        </nav>
      </header>
    </>
  );
}
