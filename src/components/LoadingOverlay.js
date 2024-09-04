import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
      <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        <span className="text-gray-700 font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;