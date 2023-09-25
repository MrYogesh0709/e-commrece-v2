import React from "react";
import PropTypes from "prop-types";

export const StarRating = ({ value, onChange }) => {
  const handleClick = (selectedRating) => {
    onChange(selectedRating);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 fill-current ${
            star <= value ? "text-yellow-500" : "text-gray-300"
          }`}
          viewBox="0 0 24 24"
          onClick={() => handleClick(star)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2l3.09 6.32L22 9.54l-5 4.87 1.18 6.84L12 19.77l-6.18 3.48L7 14.41l-5-4.87 6.91-1.22L12 2z"
          />
        </svg>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};
