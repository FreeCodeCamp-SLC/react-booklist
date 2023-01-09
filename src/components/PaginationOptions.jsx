import React from 'react';

export default function PaginationOptions({
  setListsItemCount,
  setBooksItemCount,
  isLists,
}) {
  return (
    <div className="grid place-items-center absolute right-5 sm:bottom-5 bottom-12">
      <div className="flex space-x-2 items-center">
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
        <span>items</span>
      </div>
    </div>
  );
}
