import React, { createContext, useContext, useState } from 'react';

const PageContext = createContext({ pageNumber: 1 });

export const PageProvider = ({ children }) => {
  const [itemCount, setItemCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const updateItemCount = (newItemCount) => {
    setItemCount(newItemCount);
  };

  const updatePageNumber = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <PageContext.Provider
      value={{
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
