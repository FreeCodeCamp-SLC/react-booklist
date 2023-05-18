import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { useAddList } from '../hooks/useListsApi';

export default function AddListPage() {
  const history = useHistory();
  const addList = useAddList(history);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitList(formData) {
    addList.mutate({ name: formData.listName, year: +formData.yearNum });
  }

  return (
    <section className=" sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      <div className="min-h-full col-start-2 row-start-2 bg-gray-100 ">
        <h2 className="px-4 pt-5 text-3xl font-bold text-gray-900 ">
          Create New List
        </h2>
        <div className="mx-5 overflow-hidden rounded-md shadow-md mt-7">
          <form
            onSubmit={handleSubmit(submitList)}
            className="flex flex-col px-5 pt-5 pb-2 bg-white"
            id="new book"
          >
            <label className="my-3" htmlFor="Book Title">
              List Name
              <input
                className="w-full mt-1 border-2 py-1.5 px-2 rounded-md"
                type="text"
                id="name"
                name="name"
                {...register('listName')}
                required
              />
            </label>
            <label className="my-3 flex flex-col" htmlFor="Series">
              Year
              <input
                className="border-2 w-48 py-1.5 px-2 rounded-md mt-1"
                type="number"
                name="Year"
                id="Year"
                {...register('listYear', { min: 1 })}
                required
                defaultValue={new Date().getFullYear()}
              />
              {errors?.listYear?.type === 'min' && (
                <span className="text-red-500">
                  Year must be a positive integer
                </span>
              )}
            </label>
            <div className="flex items-center h-16 bg-gray-50 ">
              <button
                className="h-10 ml-4 font-semibold text-white rounded-md bg-booklistBlue-dark w-28"
                type="submit"
                form="new book"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
