import React, { useState, useRef } from 'react';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const PlacesAutocomplete = ({ onPlaceSelect, placeholder }) => {
  const inputRef = useRef(null);
  const placesLibrary = useMapsLibrary('places');
  
  React.useEffect(() => {
    if (!placesLibrary || !inputRef.current) return;
    
    const autocomplete = new placesLibrary.Autocomplete(inputRef.current);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onPlaceSelect(place.formatted_address);
      }
    });

    return () => {
      autocomplete.unbindAll();
    };
  }, [placesLibrary, onPlaceSelect]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 text-green-800"
      required
    />
  );
};

const TripPlannerForm = ({ onSubmit, API_KEY }) => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    dateRange: [{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceSelect = (place, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: place
    }));
  };

  const handleDateChange = (item) => {
    setFormData(prev => ({
      ...prev,
      dateRange: [item.selection]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        source: formData.source,
        destination: formData.destination,
        fromDate: formData.dateRange[0].startDate.toISOString().split('T')[0],
        toDate: formData.dateRange[0].endDate.toISOString().split('T')[0]
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="source" className="block text-sm font-medium text-green-800 mb-1">Source</label>
            <PlacesAutocomplete
              onPlaceSelect={(place) => handlePlaceSelect(place, 'source')}
              placeholder="Enter source location"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="destination" className="block text-sm font-medium text-green-800 mb-1">Destination</label>
            <PlacesAutocomplete
              onPlaceSelect={(place) => handlePlaceSelect(place, 'destination')}
              placeholder="Enter destination location"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">Date Range</label>
          <DateRange
            editableDateInputs={true}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={formData.dateRange}
            className="border rounded-md bg-green-50"
            color="#22c55e"
            rangeColors={["#22c55e", "#15803d", "#166534"]}
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Planning...' : 'Plan Itinerary'}
        </button>
      </form>
    </APIProvider>
  );
};

export default TripPlannerForm;