import React from 'react';

const ConfirmationModal = ({ children, setModalIsOpen, modalCannotClose }) => {
  const closeModal = (e) => {
    if (!modalCannotClose && e.target.matches('.closeModal')) {
      document.body.style.overflowY = 'visible';
      setModalIsOpen(false);
    }
  };
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 bg-blackTransparent flex justify-center items-center px-6 closeModal"
    >
      <div className="bg-white relative rounded-xl w-full md:w-3/5 lg:w-1/2 pt-12 text-center p-6">
        {modalCannotClose || (
          <button
            className="absolute right-0 top-0 mt-3 mr-4 closeModal"
            onClick={closeModal}
            type="button"
          >
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default ConfirmationModal;
