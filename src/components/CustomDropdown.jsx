import React, { useState } from 'react';

function Select({ name, searchBooks, bookSelection, autofillBookInfo }) {
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState({});
  const [selectInput, setSelectInput] = useState('');

  function handleSelect(e, book) {
    console.log('e', e);
    setToggle(true);
    if (e.type === 'click' || e.key === 'Enter') {
      autofillBookInfo(book);
      setSelected(book);
      setSelectInput(book.volumeInfo.title);
      setToggle(false);
    }
  }
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

  return (
    <div className="relative">
      <input
        id="selectLabel"
        name={name}
        value={selectInput}
        autoComplete="off"
        onChange={(e) => {
          setSelectInput(e.target.value);
          handleSelect(e);
          searchBooks(selectInput);
        }}
        className="relative z-10 flex items-center justify-center w-full h-10 px-4 bg-gray-300 rounded-xl"
        placeholder="Search"
        type="text"
        onClick={() => {
          if (bookSelection.length > 0) setToggle(!toggle);
        }}
      />
      <ul
        role="listbox"
        aria-labelledby="selectLabel"
        style={{ top: '30px' }}
        className={`absolute w-full pt-3  bg-gray-300 flex-col justify-center  items-center ${
          toggle ? ' rounded-b-xl' : 'rounded-xl hidden'
        }`}
      >
        {selectList}
      </ul>
    </div>
  );
}

export default Select;
