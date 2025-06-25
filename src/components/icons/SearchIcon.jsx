import React from 'react';

const SearchIcon = ({ size = 1 }) => (
  <div style={{ width: `${size * 40}px`, height: `${size * 40}px` }}>
    <svg
      className="px-2 stroke-current text-booklistBlue-dark"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width="100%"
      height={`${size * 40}px`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
);

export default SearchIcon;
