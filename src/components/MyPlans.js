import { useState, useEffect } from 'react';
import { useItinerary } from './ItineraryContext';
import { useNavigate } from 'react-router-dom';
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
        navigate('/');
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
        <div className="bg-gradient-to-b from-green-50 to-blue-50 min-h-screen p-4">
            <div className="container mx-auto p-4">
                {alert.message && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert({ message: '', type: '' })}
                    />
                )}
                {isLoading && <LoadingOverlay />}
                <h1 className="text-3xl font-bold mb-6 text-center">My Plans</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userItineraries.length === 0 && "No itineraries found."}
                    {userItineraries.map((itinerary, index) => (
                        <div key={index} className="border p-4 rounded shadow-md bg-white">
                            <h3 className="text-xl font-semibold mb-2">{itinerary.source} to {itinerary.destination}</h3>
                            <p><strong>From:</strong> {itinerary.fromDate}</p>
                            <p><strong>To:</strong> {itinerary.toDate}</p>
                            <div className="mt-4 flex space-x-4">
                                <button
                                    onClick={() => handleViewItinerary(itinerary)}
                                    className="border border-green-500 text-green-500 py-2 px-4 rounded hover:bg-green-500 hover:text-white transition duration-300"
                                >
                                    View Itinerary
                                </button>
                                <button
                                    onClick={() => confirmDeleteItinerary(itinerary.id)}
                                    className="border border-yellow-500 text-yellow-500 py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition duration-300"
                                >
                                    Delete Itinerary
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
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
