import React, { useState } from 'react';

import SelectList from './SelectList';

function Select({
  name,
  searchBooks,
  bookSelection,
  setBookSelection,
  autofillBookInfo,
}) {
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState({});
  const [selectInput, setSelectInput] = useState('');

  function handleSelect(e, book) {
    setToggle(true);
    if (selectInput.length < 3) {
      setBookSelection([]);
      setToggle(false);
    }
    if (e.type === 'click' || e.key === 'Enter') {
      autofillBookInfo(book);
      setSelected(book);
      setSelectInput(`${book.volumeInfo.title} - ${book.volumeInfo.authors}`);
      setToggle(false);
    }
  }
  function outsideClickHandler() {
    setToggle(false);
    document.querySelector('#selectLabel').focus();
  }

  return (
    <div>
      <div
        className={`absolute inset-0 z-20 ${!toggle ? 'hidden' : 'block'} `}
        onClick={outsideClickHandler}
        role="dialog"
      />
      <div className="relative z-30 mt-1">
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
          className={`relative z-10 flex items-center justify-center w-full py-1.5 px-4  border-2 border-gray-500 ${
            toggle ? ' rounded-t-md' : 'rounded-md'
          }`}
          placeholder="Search By Title or Author"
          type="text"
          onClick={() => {
            if (bookSelection?.length > 0) setToggle(!toggle);
          }}
        />
        <ul
          role="listbox"
          aria-labelledby="selectLabel"
          style={{ top: '27px', maxHeight: '600px' }}
          className={`absolute w-full pt-3 bg-white flex-col justify-center overflow-y-scroll  items-center ${
            toggle ? ' rounded-b-xl' : 'rounded-xl hidden'
          }`}
        >
          <SelectList
            selected={selected}
            bookSelection={bookSelection}
            handleSelect={handleSelect}
          />
        </ul>
      </div>
    </div>
  );
}

export default Select;
