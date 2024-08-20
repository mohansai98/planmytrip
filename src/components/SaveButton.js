import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import LoadingOverlay from './LoadingOverlay';

const SaveButton = ({ itinerary, formData }) => {
    const { user } = useAuth();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!user) {
            alert('Please log in to save the itinerary');
            return;
        }

        const dataToSave = {
            ...formData,
            itinerary
        };

        setIsSaving(true);

        try {
            const response = await fetch('http://localhost:8080/itinerary/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(dataToSave),
            });

            if (response.ok) {
                alert('Itinerary saved successfully!');
            } else {
                alert('Failed to save itinerary. Please try again.');
            }
        } catch (error) {
            console.error('Error saving itinerary:', error);
            alert('An error occurred while saving the itinerary.');
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
