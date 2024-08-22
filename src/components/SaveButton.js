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
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 flex items-center"
                title="Save Itinerary"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z" clipRule="evenodd" />
</svg>


                <span className="text-sm">Save Itinerary</span>
            </button>
            {isSaving && <LoadingOverlay />}
        </div>
    );
};

export default SaveButton;
