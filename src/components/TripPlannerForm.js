import React, { useState, useRef, useEffect } from 'react';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { MapPin, Calendar, X } from 'lucide-react';

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
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
    </div>
  );
};

const TripPlannerForm = ({ onSubmit, API_KEY }) => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    dateRange: [{
      startDate: null,
      endDate: null,
      key: 'selection'
    }]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

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
    if (item.selection.startDate && item.selection.endDate) {
      setShowDatePicker(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        source: formData.source,
        destination: formData.destination,
        fromDate: formData.dateRange[0].startDate ? formData.dateRange[0].startDate.toISOString().split('T')[0] : null,
        toDate: formData.dateRange[0].endDate ? formData.dateRange[0].endDate.toISOString().split('T')[0] : null
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateRange = () => {
    const start = formData.dateRange[0].startDate;
    const end = formData.dateRange[0].endDate;
    if (start && end) {
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }
    return '';
  };

  const clearDateRange = () => {
    setFormData(prev => ({
      ...prev,
      dateRange: [{
        startDate: null,
        endDate: null,
        key: 'selection'
      }]
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <APIProvider apiKey={API_KEY}>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div className="space-y-4">
          <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <PlacesAutocomplete
              onPlaceSelect={(place) => handlePlaceSelect(place, 'source')}
              placeholder="Enter source location"
            />
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <PlacesAutocomplete
              onPlaceSelect={(place) => handlePlaceSelect(place, 'destination')}
              placeholder="Enter destination location"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={formatDateRange()}
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              readOnly
              placeholder="Select date range"
            />
            {formData.dateRange[0].startDate && (
              <button
                type="button"
                onClick={clearDateRange}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          {showDatePicker && (
            <div className="absolute z-10 mt-2" ref={datePickerRef}>
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={formData.dateRange}
                className="border rounded-md shadow-lg"
              />
            </div>
          )}
        </div>
        <button 
          type="submit" 
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Planning...' : 'Plan Your Trip'}
        </button>
      </form>
    </APIProvider>
  );
};

export default TripPlannerForm;