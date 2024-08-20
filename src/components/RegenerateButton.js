import React from 'react';

const RegenerateButton = ({ onRegenerate }) => {
  return (
    <button
      onClick={onRegenerate}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
    >
      Regenerate Itinerary
    </button>
  );
};

export default RegenerateButton;
