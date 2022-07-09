import React, { useState } from 'react';

export default function PageSelectors({
  updatePageNumber,
  pageNumber,
  totalPages,
}) {
  const [localPageNumber, setLocalPageNumber] = useState(pageNumber);
  return (
    <div className="space-x-2 flex">
      <div
        className="border-1 border-gray-500 p-2"
        onClick={() => updatePageNumber(pageNumber - 2)}
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
      </div>
      <div
        className="border-1 border-gray-500 p-2"
        onClick={() => updatePageNumber(pageNumber - 1)}
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
      </div>
      <div
        className="border-1 border-gray-500 p-2"
        onClick={() => updatePageNumber(pageNumber + 1)}
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
      </div>
      <div
        className="border-1 border-gray-500 p-2"
        onClick={() => updatePageNumber(pageNumber + 1)}
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
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </div>
      <input type="number" value={pageNumber} />
    </div>
  );
}
