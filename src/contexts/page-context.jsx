import React, { createContext, useState } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [booksItemCount, setBooksItemCount] = useState(10);
  const [listsItemCount, setListsItemCount] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState('Title: Ascending');
  const [idOfListClicked, setList] = useState('1')

  return (
    <PageContext.Provider
      value={{
        sortBy,
        setSortBy,
        booksItemCount,
        listsItemCount,
        pageNumber,
        setBooksItemCount,
        setListsItemCount,
        setPageNumber,
        idOfListClicked,
        setList
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export default PageContext;
