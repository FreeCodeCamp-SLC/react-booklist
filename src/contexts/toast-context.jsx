import React, { createContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastFade, setToastFade] = useState(false);
  const [toastStatus, setToastStatus] = useState('');
  const [toastType, setToastType] = useState('');
  const [book, setBook] = useState({});

  return (
    <ToastContext.Provider
      value={{
        toastFade,
        setToastFade,
        toastStatus,
        setToastStatus,
        toastType,
        setToastType,
        book,
        setBook,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
