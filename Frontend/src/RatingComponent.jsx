import React, { useState } from 'react';

const RatingComponent = ({ onRate }) => {
  const [rating, setRating] = useState(0); // State to hold the current rating

  const handleRatingChange = (rate) => {
    setRating(rate); // Update the rating state when a star is clicked
  };

  const handleSubmit = () => {
    if (rating) {
      onRate(rating); // Call the parent callback function to submit the rating
      setRating(0); // Reset the rating after submission
    }
  };

  return (
    <div className="mt-4">
      <h4 className="font-bold">Rate the Mechanic</h4>
      <div className="flex">
        {/* Render 5 stars for rating */}
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRatingChange(star)} // Set rating on star click
            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
      <button
        onClick={handleSubmit} // Call handleSubmit on button click
        className="mt-2 bg-blue-500 text-white p-2 rounded"
      >
        Submit Rating
      </button>
    </div>
  );
};

export default RatingComponent;
