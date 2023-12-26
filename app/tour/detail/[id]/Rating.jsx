import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div>
      <p>あなたの評価: {rating} 星</p>
      <div className="flex">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label
              key={index}
              className="cursor-pointer mr-2"
              onClick={() => handleStarClick(ratingValue)}
            >
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                className="hidden"
              />
              <FaStar
                className={`text-2xl ${
                  ratingValue <= rating ? 'text-yellow-500' : 'text-gray-300'
                }`}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
