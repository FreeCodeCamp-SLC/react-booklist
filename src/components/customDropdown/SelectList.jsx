import React from 'react';

const SelectList = ({ selected, bookSelection, handleSelect }) => {
  if (bookSelection) {
    return bookSelection.map((book) => (
      <li
        role="option"
        aria-selected={selected.id === book.id}
        key={book.id}
        tabIndex="0"
        className="flex items-center justify-between px-4 py-4 border cursor-pointer border-slate-800 focus:bg-slate-400 hover:bg-slate-400"
        onClick={(e) => handleSelect(e, book)}
        onKeyDown={(e) => handleSelect(e, book)}
      >
        <div>
          <div className="text-lg bookTitle">{book.volumeInfo.title}</div>
          <div className="text-sm bookAuthor">
            {book.volumeInfo?.authors?.map((a) => a).join(', ')}
          </div>
        </div>
        <div className="h-12 overflow-y-hidden rounded-lg">
          <img
            src={
              book.volumeInfo?.imageLinks?.smallThumbnail ||
              'https://img.icons8.com/fluency/48/000000/book.png'
            }
            alt="book"
            className="w-12 overflow-y-hidden "
          />
        </div>
      </li>
    ));
  }
  return null;
};

export default SelectList;
