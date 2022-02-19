import React from 'react';

const DropdownImage = ({ image }) => {
  let bookImage;
  if (image && image.smallThumbnail) {
    bookImage = (
      <img
        src={image.smallThumbnail}
        alt="book"
        className="w-12 overflow-y-hidden "
      />
    );
  } else {
    bookImage = (
      <img
        src="https://img.icons8.com/fluency/48/000000/book.png"
        alt="book"
        className="w-12"
      />
    );
  }

  return <div className="h-12 overflow-y-hidden rounded-lg">{bookImage}</div>;
};

export default DropdownImage;
