import React, { useState, useEffect } from 'react';
import { useItinerary } from './ItineraryContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, Trash2, MapPin, Calendar } from 'lucide-react';
import Alert from './Alert';
import LoadingOverlay from './LoadingOverlay';
import ConfirmationModal from './ConfirmationModal';

const API_URL = process.env.REACT_APP_API_URL;

const MyPlans = () => {
    const user = localStorage.getItem('token');
    const { setItinerary, setFormData } = useItinerary();
    const [userItineraries, setUserItineraries] = useState([]);
    const [idToDelete, setIdToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserItineraries = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/itinerary/list`, {
                    headers: {
                        'Authorization': `Bearer ${user}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const parsedData = data.map(item => {
                        try {
                            return {
                                ...JSON.parse(item.itinerary),
                                id: item.id,
                            };
                        } catch (error) {
                            setAlert({ message: 'Error parsing itineraries.', type: 'error' });
                            return null;
                        }
                    }).filter(item => item !== null);
                    setUserItineraries(parsedData);
                } else {
                    setAlert({ message: `Error fetching itineraries: ${response.status}`, type: 'error' });
                }
            } catch (error) {
                setAlert({ message: `Error fetching itineraries: ${error.message}`, type: 'error' });
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchUserItineraries();
        } else {
            navigate('/');
        }
    }, [user, navigate, idToDelete]);

    const handleViewItinerary = (itinerary) => {
        setFormData({
            source: itinerary.source,
            destination: itinerary.destination,
            fromDate: itinerary.fromDate,
            toDate: itinerary.toDate,
        });
        setItinerary(itinerary.itinerary);
        navigate('/plan');
    };

    const handleDeleteItinerary = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/itinerary/${idToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user}`,
                },
            });

            if (response.ok) {
                setAlert({ message: 'Itinerary deleted successfully.', type: 'success' });
                setUserItineraries(userItineraries.filter(itinerary => itinerary.id !== idToDelete));
            } else {
                setAlert({ message: `Error deleting itinerary: ${response.status}`, type: 'error' });
            }
        } catch (error) {
            setAlert({ message: `Error deleting itinerary: ${error.message}`, type: 'error' });
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
            setIdToDelete(null);
        }
    };

    const confirmDeleteItinerary = (id) => {
        setIdToDelete(id);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {alert.message && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert({ message: '', type: '' })}
                    />
                )}
                {isLoading && <LoadingOverlay />}
                <h1 className="text-3xl font-bold mb-6 text-gray-900">My Plans</h1>
                {userItineraries.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-gray-600">No itineraries found. Start planning your trip now!</p>
                        <Link to="/plan" className="inline-block mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                            Create a Plan
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {userItineraries.map((itinerary, index) => (
                            <div key={index} className="bg-white overflow-hidden shadow-md rounded-lg transition duration-300 hover:shadow-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="mb-2 flex items-center text-sm">
                                        <MapPin className="h-5 w-5 mr-2 text-blue-500" aria-hidden="true" />
                                        <p className="text-sm text-gray-600">From: <span className="font-medium text-gray-800">{itinerary.source}</span></p>
                                    </div>
                                    <div className="mb-4 flex items-center text-sm">
                                        <MapPin className="h-5 w-5 mr-2 text-blue-500" aria-hidden="true" />
                                        <p className="text-sm text-gray-600">To: <span className="font-medium text-gray-800">{itinerary.destination}</span></p>
                                    </div>
                                    <div className="mb-4 flex items-center text-sm text-gray-500">
                                        <Calendar className="h-5 w-5 mr-2" aria-hidden="true" />
                                        <span>{itinerary.fromDate} - {itinerary.toDate}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <button
                                            onClick={() => handleViewItinerary(itinerary)}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                        >
                                            <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                                            View Itinerary
                                        </button>
                                        <button
                                            onClick={() => confirmDeleteItinerary(itinerary.id)}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={handleDeleteItinerary}
                onCancel={() => setIsModalOpen(false)}
                message="Are you sure you want to delete this itinerary?"
            />
        </div>
    );
};

export default MyPlans;