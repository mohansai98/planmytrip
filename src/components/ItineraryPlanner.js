import React, { useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import TripPlannerForm from './TripPlannerForm';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const ItineraryPlanner = () => {
  const [itinerary, setItinerary] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [openInfoWindow, setOpenInfoWindow] = useState(null);
  const [mapZoom, setMapZoom] = useState(12);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/itinerary/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setItinerary(data.itinerary);
    } catch (error) {
      console.error('Error fetching itinerary:', error);
    }
  };

  const handleDayClick = (index) => {
    setSelectedDay(index);
    setSelectedActivity(null);
    setOpenInfoWindow(null);
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setOpenInfoWindow(activity);
    setMapZoom(12);
  };

  const handleMarkerClick = (activity) => {
    setOpenInfoWindow(activity);
    setSelectedActivity(activity);
  };

  const handleInfoWindowClose = () => {
    setOpenInfoWindow(null);
  };

  const handleMapClick = () => {
    setSelectedActivity(null);
    setOpenInfoWindow(null);
  };

  const handleZoomChanged = (zoom) => {
    setMapZoom(zoom);
  };

  const mapCenter = useCallback(() => {
    if (!itinerary) return { lat: 0, lng: 0 };
    if (selectedActivity) {
      return selectedActivity.coordinates;
    }
    const activities = itinerary[selectedDay].activities;
    return activities[Math.floor(activities.length / 2)].coordinates;
  }, [selectedDay, selectedActivity, itinerary]);

  if (!itinerary) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Plan Your Trip</h1>
        <TripPlannerForm onSubmit={handleFormSubmit} API_KEY={API_KEY} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Itinerary</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="flex mb-4 overflow-x-auto">
            {itinerary.map((day, index) => (
              <button
                key={index}
                className={`px-4 py-2 whitespace-nowrap rounded-md mr-2 ${
                  selectedDay === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => handleDayClick(index)}
              >
                Day {day.day}
              </button>
            ))}
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
            {itinerary[selectedDay].activities.map((activity, index) => (
              <div
                key={index}
                className={`p-4 border rounded-md cursor-pointer transition duration-200 ${
                  selectedActivity === activity
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => handleActivityClick(activity)}
              >
                <h1 className="text-sm text-gray-500">{activity.type}</h1>
                <h3 className="font-bold">{activity.name}</h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-sm font-semibold mt-2">{activity.location}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Duration: {activity.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/3 h-[calc(100vh-100px)]">
          <APIProvider apiKey={API_KEY}>
            <Map
              center={mapCenter()}
              zoom={mapZoom}
              gestureHandling={'greedy'}
              disableDefaultUI={false}
              mapId={'19eb6e4a799c5279'}
              onClick={handleMapClick}
              onZoomChanged={(e) => handleZoomChanged(e.detail.zoom)}
              className="w-full h-full rounded-lg shadow-md"
            >
              {itinerary[selectedDay].activities.map((activity, index) => (
                <AdvancedMarker
                  key={index}
                  position={activity.coordinates}
                  onClick={() => handleMarkerClick(activity)}
                >
                  <Pin
                    background={selectedActivity === activity ? '#3B82F6' : '#22C55E'}
                    borderColor={selectedActivity === activity ? '#1D4ED8' : '#065F46'}
                    glyphColor={'#FFFFFF'}
                    scale={selectedActivity === activity ? 1.2 : 1}
                  />
                </AdvancedMarker>
              ))}
              {openInfoWindow && (
                <InfoWindow
                  position={openInfoWindow.coordinates}
                  onCloseClick={handleInfoWindowClose}
                >
                  <div className="p-2 max-w-xs">
                    <h3 className="font-bold text-lg mb-1">{openInfoWindow.name}</h3>
                    <p className="text-sm mb-2">{openInfoWindow.description}</p>
                    <p className="text-sm font-semibold">Duration: {openInfoWindow.duration}</p>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlanner;