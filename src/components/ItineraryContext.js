import React, { createContext, useState, useContext } from 'react';

const ItineraryContext = createContext();

export const ItineraryProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState(null);
  const [formData, setFormData] = useState(null);

  return (
    <ItineraryContext.Provider value={{ itinerary, setItinerary, formData, setFormData }}>
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItinerary = () => useContext(ItineraryContext);
