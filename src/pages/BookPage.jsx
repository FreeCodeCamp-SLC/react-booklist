import React from 'react';

import Header from '../components/Header';

export default function BookPage() {
  return (
    <section className=" sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      <div className="min-h-full col-start-2 row-start-2 bg-gray-100 ">
        <div className="flex pt-5 justify-between items-center">
          <h2 className="px-4 text-3xl font-bold text-gray-900 ">Book Page</h2>
        </div>
        <div className="mx-5 overflow-hidden rounded-md shadow-md mt-7" />
      </div>
    </section>
  );
}
