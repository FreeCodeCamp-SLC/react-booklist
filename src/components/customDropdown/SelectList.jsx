import React from 'react';

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
      let image;
      if (
        book.volumeInfo.imageLinks &&
        book.volumeInfo.imageLinks.smallThumbnail
      ) {
        image = (
          <div className="h-12 overflow-y-hidden rounded-lg">
            <img
              src={book.volumeInfo.imageLinks.smallThumbnail}
              alt="book"
              className="w-12 overflow-y-hidden "
            />
          </div>
        );
      } else {
        <img
          src="https://img.icons8.com/fluency/48/000000/book.png"
          alt="book"
          className="w-12"
        />;
      }
      return (
        <li
          role="option"
          aria-selected={selected.id === book.id}
          key={book.id}
          tabIndex="0"
          className="flex items-center justify-between px-4 py-4 border-t cursor-pointer border-slate-800 focus:bg-slate-400 hover:bg-slate-400"
          onClick={(e) => handleSelect(e, book)}
          onKeyDown={(e) => handleSelect(e, book)}
        >
          <div>
            <div className="text-lg bookTitle">{book.volumeInfo.title}</div>
            {authors}
          </div>
          {image}
        </li>
      );
    });
  } else {
    selectList = null;
  }
  return <>{selectList}</>;
};

export default SelectList;
