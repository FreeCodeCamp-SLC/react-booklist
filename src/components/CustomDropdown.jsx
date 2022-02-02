import React, { useState } from 'react';

function Select() {
  const [toggle, setToggle] = useState(false);
  const [selected, selectedToggle] = useState(null);
  const [selectInput, setSelectInput] = useState('');
  const [options, setOptions] = useState([]);

  function handleSelect(e, option) {
    if (e.type === 'click' || e.charCode === 13) {
      selectedToggle(option);
      setSelectInput(option);
      setToggle(false);
    }
    if (e.key === 'ArrowDown') {
      e.currentTarget.nextSibling && e.currentTarget.nextSibling.focus();
    }
    if (e.key === 'ArrowUp') {
      e.currentTarget.previousSibling &&
        e.currentTarget.previousSibling.focus();
    }
  }

  function search(event) {
    setSelectInput(event.target.value);
    setOptions([...options, event.target.value]);
  }

  return (
    <>
      <input
        id="selectLabel"
        value={selectInput}
        onChange={(e) => search(e)}
        className="absolute z-10 flex items-center justify-center w-full h-10 px-4 bg-gray-300 rounded-xl"
        placeholder="Search"
        type="text"
        onClick={() => setToggle(!toggle)}
      />

      <ul
        role="listbox"
        aria-labelledby="selectLabel"
        style={{ top: '30px' }}
        className={`absolute w-full pt-3  bg-gray-300 flex-col justify-center  items-center transform transition ease-in ${
          toggle
            ? 'translate-y-0 opacity-100  rounded-b-xl'
            : '-translate-y-20 rounded-xl opacity-0 '
        }`}
      >
        {options.map((option, i) => (
          <li
            role="option"
            aria-selected={selected === option}
            tabIndex="0"
            key={option + i}
            className="flex items-center justify-between h-10 px-4 border-t cursor-pointer border-slate-800 focus:bg-slate-400"
            onClick={(e) => {
              handleSelect(e, option);
            }}
            onKeyDown={(e) => {
              handleSelect(e, option);
            }}
          >
            {option}
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/book.png"
              alt="book"
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Select;
