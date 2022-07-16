import React from 'react';

export default function PaginationOptions({
  setListsItemCount,
  setBooksItemCount,
  isLists,
}) {
  return (
    <div className="flex space-x-2 items-center">
      <label htmlFor="paginationOptions">Show</label>
      <select
        id="paginationOptions"
        name="paginationOptions"
        onChange={(e) => {
          if (isLists) {
            setListsItemCount(e.target.value);
          } else {
            setBooksItemCount(e.target.value);
          }
        }}
      >
        <option>{isLists ? 5 : 10}</option>
        <option>{isLists ? 10 : 25}</option>
        <option>{isLists ? 15 : 50}</option>
        <option>{isLists ? 20 : 100}</option>
      </select>
      <span>{isLists ? 'lists' : 'books'} per page</span>
    </div>
  );
}
