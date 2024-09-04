import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import LoadingOverlay from './LoadingOverlay';
import { Save } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL;

const SaveButton = ({ itinerary, formData, setAlert }) => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      setAlert({ message: 'Please log in to save the itinerary', type: 'error' });
      return;
    }

    const dataToSave = {
      ...formData,
      itinerary
    };

    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/itinerary/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        setAlert({ message: 'Itinerary saved successfully!', type: 'success' });
      } else {
        setAlert({ message: 'Failed to save itinerary. Please try again.', type: 'error' });
      }
    } catch (error) {
      setAlert({ message: 'An error occurred while saving the itinerary.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save className="w-5 h-5 mr-2" />
        Save Itinerary
      </button>
      {isSaving && <LoadingOverlay />}
    </div>
  );
};

export default SaveButton;