import React, { useState } from 'react';

import SelectList from './SelectList';

function Select({ name, searchBooks, bookSelection, autofillBookInfo }) {
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState({});
  const [selectInput, setSelectInput] = useState('');

  function handleSelect(e, book) {
    setToggle(true);
    if (e.type === 'click' || e.key === 'Enter') {
      autofillBookInfo(book);
      setSelected(book);
      setSelectInput(book.volumeInfo.title);
      setToggle(false);
    }
  }

  return (
    <div className="relative mt-1">
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
        className={`relative z-10 flex items-center justify-center w-full py-1.5 px-4  border-2 ${
          toggle ? ' rounded-t-md' : 'rounded-md'
        }`}
        placeholder="Search"
        type="text"
        onClick={() => {
          if (bookSelection.length > 0) setToggle(!toggle);
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
  );
}

export default Select;
