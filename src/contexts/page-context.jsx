import React, { createContext, useState } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [itemCount, setItemCount] = useState(3);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState('Title: Ascending');

  return (
    <PageContext.Provider
      value={{
        sortBy,
        setSortBy,
        itemCount,
        pageNumber,
        setItemCount,
        setPageNumber,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export default PageContext;
