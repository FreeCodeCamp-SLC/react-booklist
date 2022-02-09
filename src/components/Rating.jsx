import React from 'react';

const Rating = ({ placeholderRating }) => (
  <div className="flex items-center gap-1">
    <div className="text-xl text-red-500">&#9733;</div>
    {placeholderRating}
  </div>
);

export default Rating;
