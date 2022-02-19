import React from 'react';

import DropdownImage from './DropdownImage';

const SelectList = ({ selected, bookSelection, handleSelect }) => {
  let selectList;
  if (bookSelection) {
    selectList = bookSelection.map((book) => {
      let authors;
      if (book.volumeInfo.authors) {
        authors = (
          <div className="text-sm bookAuthor">
            {book.volumeInfo.authors.map((a) => a).join(', ')}
          </div>
        );
      } else {
        authors = null;
      }

      return (
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
            {authors}
          </div>
          <DropdownImage image={book.volumeInfo.imageLinks} />
        </li>
      );
    });
  } else {
    selectList = null;
  }
  return <>{selectList}</>;
};

export default SelectList;
