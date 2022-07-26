import React from 'react';
// import { QueryClient } from 'react-query';

export default function SortOptions({ setSortBy, isLists }) {
  // const queryClient = new QueryClient();
  const sortHandler = (e) => {
    // queryClient.invalidateQueries();
    setSortBy(e.target.value);
  };
  return (
    <div className="flex space-x-2 items-center">
      <label htmlFor="sort">Sort By</label>
      <select id="sort" name="sort" onChange={(e) => sortHandler(e)}>
        <option>Name: Asc</option>
        <option>Name: Desc</option>
        <option>Most Recent: Asc</option>
        <option>Most Recent: Desc</option>

        {isLists && (
          <>
            <option>Year: Asc</option>
            <option>Year: Desc</option>
          </>
        )}
      </select>
    </div>
  );
}
