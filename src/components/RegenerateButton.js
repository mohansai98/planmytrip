import React from 'react';
import { RefreshCw } from 'lucide-react';

const RegenerateButton = ({ onRegenerate }) => {
  return (
    <button
      onClick={onRegenerate}
      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      <RefreshCw className="w-5 h-5 mr-2" />
      Regenerate
    </button>
  );
};

export default RegenerateButton;