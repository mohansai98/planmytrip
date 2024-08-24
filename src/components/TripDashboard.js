import React from 'react';

const TripDashboard = ({ source, destination, fromDate, toDate }) => {
  const formatDate = (dateString) => {
    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-r from-green-300 to-emerald-300 p-6 rounded-lg shadow-lg mb-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="sm:col-span-2 md:col-span-2 bg-white/20 p-4 rounded-md backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-md font-bold">{source}</p>
              <p className="text-sm opacity-80">Departure</p>
            </div>
            <div className="text-2xl">→</div>
            <div>
              <p className="text-md font-bold">{destination}</p>
              <p className="text-sm opacity-80">Arrival</p>
            </div>
          </div>
        </div>
        <div className="sm:col-span-1 md:col-span-1 bg-white/20 p-4 rounded-md backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-md font-bold">{formatDate(fromDate)}</p>
              <p className="text-xs opacity-80">Start</p>
            </div>
            <div className="text-xl">→</div>
            <div>
              <p className="text-md font-bold">{formatDate(toDate)}</p>
              <p className="text-xs opacity-80">End</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDashboard;