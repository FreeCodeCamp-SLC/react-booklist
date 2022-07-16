import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PageSelectors({
  setPageNumber,
  pageNumber,
  itemCount,
  totalPages,
}) {
  const maxPage = Math.ceil(totalPages.totalBookCount / itemCount);
  const [pageInput, setPageInput] = useState(maxPage);

  const pageInputHandler = (_pageNumber) => {
    if (_pageNumber <= maxPage && _pageNumber > 0) {
      console.log('max Page', maxPage);
      console.log('_pageNumber', _pageNumber);

      setPageNumber(_pageNumber);
    }
  };
  return (
    <div className="space-x-1 flex items-center">
      {pageNumber !== 1 && (
        <>
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
            onClick={() => setPageNumber(pageNumber--)}
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
        </>
      )}

      <div>
        <div> {pageNumber}</div>
      </div>
      {pageNumber !== maxPage && (
        <>
          <button
            className="border-1 border-gray-500 p-2"
            onClick={() => setPageNumber(pageNumber++)}
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
                d="M9 5l7 7-7 7"
              />
            </svg>{' '}
          </button>
          <button onClick={() => pageInputHandler(pageInput)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
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
          </button>
          <input
            className="w-10"
            value={pageInput}
            type="number"
            maxLength={3}
            max={maxPage}
            onChange={(e) => setPageInput(e.target.value)}
          />
        </>
      )}
    </div>
  );
}
