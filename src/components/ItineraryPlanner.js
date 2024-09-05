import React, { useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import TripPlannerForm from './TripPlannerForm';
import RegenerateButton from './RegenerateButton';
import SaveButton from './SaveButton';
import LoadingOverlay from './LoadingOverlay';
import { useItinerary } from './ItineraryContext';
import Alert from './Alert';
import TripDashboard from './TripDashboard';
import { MapPin, Clock } from 'lucide-react';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

const ItineraryPlanner = () => {
  const { itinerary, setItinerary, formData, setFormData } = useItinerary();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [openInfoWindow, setOpenInfoWindow] = useState(null);
  const [mapZoom, setMapZoom] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleFormSubmit = async (data) => {
    setFormData(data);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/itinerary/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      setItinerary(responseData.itinerary);
    } catch (error) {
      setAlert({ message: 'Error fetching itinerary.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (formData) {
      await handleFormSubmit(formData);
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
    setMapZoom(14);
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

  const handleZoomChanged = (e) => {
    const zoom = e.detail?.zoom;
    if (typeof zoom === 'number') {
      setMapZoom(zoom);
    }
  };

  const mapCenter = useCallback(() => {
    if (!itinerary || !itinerary[selectedDay]) return { lat: 0, lng: 0 };
    if (selectedActivity) {
      return selectedActivity.coordinates || { lat: 0, lng: 0 };
    }
    const activities = itinerary[selectedDay]?.activities || [];
    if (activities.length === 0) return { lat: 0, lng: 0 };
    return activities[Math.floor(activities.length / 2)]?.coordinates || { lat: 0, lng: 0 };
  }, [selectedDay, selectedActivity, itinerary]);

  if (!itinerary) {
    return (
      <div className="container mx-auto p-4">
        {alert.message && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert({ message: '', type: '' })}
          />
        )}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Plan Your Trip</h1>
        <div className="max-w-2xl mx-auto">
          <TripPlannerForm onSubmit={handleFormSubmit} API_KEY={API_KEY} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: '', type: '' })}
        />
      )}
      {isLoading && <LoadingOverlay />}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-800">Your Itinerary</h1>
        <div className="flex space-x-2">
          <RegenerateButton onRegenerate={handleRegenerate} />
          <SaveButton itinerary={itinerary} formData={formData} setAlert={setAlert} />
        </div>
      </div>

      <TripDashboard
        source={formData.source}
        destination={formData.destination}
        fromDate={formData.fromDate}
        toDate={formData.toDate}
      />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="flex mb-4 overflow-x-auto pb-2">
            {itinerary.map((day, index) => (
              <button
                key={index}
                className={`px-4 py-2 whitespace-nowrap rounded-md mr-2 ${selectedDay === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                onClick={() => handleDayClick(index)}
              >
                Day {day.day}
              </button>
            ))}
          </div>
          <div className="flex-grow overflow-y-auto pr-2 space-y-4">
            {itinerary[selectedDay]?.activities?.map((activity, index) => (
              <div
                key={index}
                className={`p-4 border rounded-md cursor-pointer transition duration-200 ${selectedActivity === activity
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white hover:bg-gray-50'
                  }`}
                onClick={() => handleActivityClick(activity)}
              >
                {activity.photoUrl &&
                  <img src={activity.photoUrl} alt={activity.name} className="w-full h-40 object-cover rounded-md mb-2" />
                }
                <h3 className="font-bold text-gray-800">{activity.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <div className="flex items-center mt-2 text-sm text-gray-700">
                  <MapPin size={16} className="mr-1" />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-700">
                  <Clock size={16} className="mr-1" />
                  <span>Duration: {activity.duration} {activity.duration > 1 ? "hours" : "hour"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-2/3 h-[500px] lg:h-auto">
          <APIProvider apiKey={API_KEY}>
            <Map
              center={mapCenter()}
              zoom={mapZoom}
              gestureHandling={'greedy'}
              disableDefaultUI={false}
              mapId={'19eb6e4a799c5279'}
              onClick={handleMapClick}
              onZoomChanged={handleZoomChanged}
              className="w-full h-full rounded-lg shadow-md"
            >
              {itinerary[selectedDay]?.activities?.map((activity, index) => (
                <AdvancedMarker
                  key={index}
                  position={activity.coordinates}
                  onClick={() => handleMarkerClick(activity)}
                >
                  <Pin
                    background={selectedActivity === activity ? '#2563EB' : '#3B82F6'}
                    borderColor={selectedActivity === activity ? '#1D4ED8' : '#2563EB'}
                    glyphColor={'#FFFFFF'}
                    scale={selectedActivity === activity ? 1.2 : 1}
                  />
                </AdvancedMarker>
              ))}
              {openInfoWindow && (
                <InfoWindow
                  headerContent={openInfoWindow.name}
                  position={openInfoWindow.coordinates}
                  onCloseClick={handleInfoWindowClose}
                />
              )}
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlanner;