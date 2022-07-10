import React from 'react';

export default function SortOptions({ setSortBy, isLists }) {
  return (
    <div className="flex space-x-2 items-center">
      <label htmlFor="sort">Sort By</label>
      <select id="sort" name="sort" onChange={(e) => setSortBy(e.target.value)}>
        <option>Title: Ascending</option>
        <option>Title: Descending</option>
        <option>Newest</option>
        <option>Oldest</option>
        {isLists && (
          <>
            <option>Year: Ascending</option>
            <option>Year: Descending</option>
          </>
        )}
      </select>
    </div>
  );
}
