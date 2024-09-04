import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

const TripDashboard = ({ source, destination, fromDate, toDate }) => {
  const formatDate = (dateString) => {
    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center space-x-4">
          <MapPin className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-500">From</p>
            <p className="font-semibold text-gray-800">{source}</p>
          </div>
          <div className="text-gray-400">→</div>
          <div>
            <p className="text-sm text-gray-500">To</p>
            <p className="font-semibold text-gray-800">{destination}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Calendar className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-500">Dates</p>
            <p className="font-semibold text-gray-800">
              {formatDate(fromDate)} - {formatDate(toDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDashboard;