import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import useListsApi from '../hooks/useListsApi'
import Header from '../components/Header'
import List from '../components/List'
import SortOptions from '../components/SortOptions'
import PageSelectors from '../components/PageSelectors'
import PaginationOptions from '../components/PaginationOptions'
import PageContext from '../contexts/page-context'

export default function Lists () {
  const {
    listsItemCount,
    pageNumber,
    setListsItemCount,
    setPageNumber,
    setSortBy,
    sortBy,
  } = useContext(PageContext)
  const {
    data: lists,
    isLoading: listsIsLoading,
    isError: listsIsError,
    refetch: refetchLists,
  } = useListsApi(listsItemCount, pageNumber, sortBy)

  let totalBookPages = 0
  if (lists && lists.books) {
    totalBookPages = lists.books.length
  }

  useEffect(() => {
    setPageNumber(1)
  }, [])
  useEffect(async () => {
    await refetchLists()
  }, [listsItemCount, pageNumber, sortBy])

  return (
    <section className='sm:grid grid-cols-layout grid-rows-layout'>
      <Header />
      <div className='min-h-full col-start-2 row-start-2 bg-gray-100 '>
        <div className='flex py-5 px-6 justify-between items-center'>
          <h2 className='text-3xl font-bold text-gray-900'>Lists</h2>
          <SortOptions setSortBy={setSortBy} sortBy={sortBy} isLists />
          <div className='flex flex-col items-center'>
            <Link className='text-booklistBlue-dark' to='add-list'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </Link>
            <span className='text-sm'>new list</span>
          </div>
        </div>
        {listsIsLoading && (
          <h2 className='px-5 pt-5 text-3xl font-bold text-gray-900'>
            Loading Lists...
          </h2>
        )}
        {listsIsError && (
          <h2 className='px-5 pt-5 text-3xl font-bold text-gray-900'>
            Error Fetching Books
          </h2>
        )}
        {lists && (
          <>
            <div className='grid grid-cols-1 pb-6 mx-6 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
              {lists?.lists.map(list => (
                <List
                  key={list.list_id}
                  list={list}
                  id={list.list_id}
                  booksInList={lists?.books.filter(
                    book => book.list_id === list.list_id,
                  )}
                  refetchLists={refetchLists}
                />
              ))}
            </div>

            <div className='mx-5 overflow-hidden rounded-md shadow-md mt-7' />
            <div className='grid place-items-center'>
              <PageSelectors
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                listsItemCount={listsItemCount}
                totalBooksPages={totalBookPages}
                totalListsPages={lists.totalListCount}
                isLists
              />
              <PaginationOptions
                setListsItemCount={setListsItemCount}
                isLists
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
