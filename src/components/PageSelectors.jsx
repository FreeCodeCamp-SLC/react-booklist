import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PageSelectors({
  setPageNumber,
  pageNumber,
  itemCount,
  totalPages,
}) {
  const maxPage = Math.ceil(totalPages.totalBookCount / itemCount);
  return (
    <div className="space-x-1 flex items-center">
      <button
        className="border-1 border-gray-500 p-2"
        onClick={() => setPageNumber(1)}
        role="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="border-1 border-gray-500 p-2"
        onClick={() => setPageNumber(pageNumber - 1)}
        role="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>{' '}
      </button>
      <div>
        <div> {pageNumber}</div>
      </div>
      <button
        className="border-1 border-gray-500 p-2"
        onClick={() => setPageNumber(pageNumber + 1)}
        role="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>{' '}
      </button>

      <button onClick={() => setPageNumber(maxPage)}>{maxPage}</button>
    </div>
  );
}
