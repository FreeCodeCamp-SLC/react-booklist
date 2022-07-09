import React from 'react';

export default function PaginationOptions({
  updateItemCount,
  updatePageNumber,
  isLists,
}) {
  return (
    <div className="flex space-x-2 items-center">
      <label htmlFor="paginationOptions">Show</label>
      <select
        id="paginationOptions"
        name="paginationOptions"
        onChange={(e) => updateItemCount(e.target.value)}
      >
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
      </select>
      <span>{isLists ? 'lists' : 'books'} per page</span>
    </div>
  );
}
