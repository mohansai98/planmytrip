import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import LoadingOverlay from './LoadingOverlay';

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
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
                Save Itinerary
            </button>
            {isSaving && <LoadingOverlay />}
        </div>
    );
};

export default SaveButton;
