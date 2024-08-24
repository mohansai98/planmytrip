import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-stone-500 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );
};

export default LoadingOverlay;