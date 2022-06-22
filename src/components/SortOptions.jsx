import React from 'react';

export default function SortOptions() {
  return (
    <div className="flex space-x-2 items-center">
      <label htmlFor="sort">Sort</label>
      <select name="sort">
        <option>Ascending</option>
      </select>
      <button className="bg-booklistBlue px-4 py-2" type="button">
        save
      </button>
    </div>
  );
}
