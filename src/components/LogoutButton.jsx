import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { clearAuthToken } from '../utils/local-storage';

const LogoutButton = () => {
  const { logout, isAuthenticated, isLoading } = useAuth0();

  function logOutHandler() {
    logout({ returnTo: window.location.origin });
    clearAuthToken();
  }
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <li className="p-1 focus:bg-booklistBlue-dark text-center sm:text-left">
        <button
          className="flex font-semibold"
          type="button"
          onClick={() => logOutHandler()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="white"
            viewBox="0 0 512 512"
            stroke="currentColor"
          >
            <path d="m361.5 392v40c0 44.113281-35.886719 80-80 80h-201c-44.113281 0-80-35.886719-80-80v-352c0-44.113281 35.886719-80 80-80h201c44.113281 0 80 35.886719 80 80v40c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-40c0-22.054688-17.945312-40-40-40h-201c-22.054688 0-40 17.945312-40 40v352c0 22.054688 17.945312 40 40 40h201c22.054688 0 40-17.945312 40-40v-40c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm136.355469-170.355469-44.785157-44.785156c-7.8125-7.8125-20.476562-7.8125-28.285156 0-7.8125 7.808594-7.8125 20.472656 0 28.28125l31.855469 31.859375h-240.140625c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h240.140625l-31.855469 31.859375c-7.8125 7.808594-7.8125 20.472656 0 28.28125 3.90625 3.90625 9.023438 5.859375 14.140625 5.859375 5.121094 0 10.238281-1.953125 14.144531-5.859375l44.785157-44.785156c19.496093-19.496094 19.496093-51.214844 0-70.710938zm0 0" />
          </svg>
          Log Out
        </button>
      </li>
    )
  );
};

export default LogoutButton;
