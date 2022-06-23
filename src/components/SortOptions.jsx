import React from 'react';

export default function SortOptions({ setSortBy, isLists }) {
  return (
    <div className="flex space-x-2 items-center">
      <label htmlFor="sort">Sort By</label>
      <select id="sort" name="sort" onChange={(e) => setSortBy(e.target.value)}>
        <option>Recently Added - Ascending</option>
        <option>Recently Added - Descending</option>
        <option>Alphabetically - Ascending</option>
        <option>Alphabetically - Descending</option>
        {isLists && (
          <>
            <option>By Year - Ascending</option>
            <option>By Year - Descending</option>
          </>
        )}
      </select>
    </div>
  );
}
