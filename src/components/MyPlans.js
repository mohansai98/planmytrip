import { useState, useEffect } from 'react';
import { useItinerary } from './ItineraryContext';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const API_URL = process.env.REACT_APP_API_URL;

const MyPlans = () => {
    const user = localStorage.getItem('token');
    const { setItinerary } = useItinerary();
    const [userItineraries, setUserItineraries] = useState([]);
    const [idToDelete, setIdToDelete] = useState(null);
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchUserItineraries = async () => {
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
            }
        };

        if (user) {
            fetchUserItineraries();
        } else {
            navigate('/');
        }
    }, [user, navigate, idToDelete]);

    const handleViewItinerary = (itinerary) => {
        setItinerary(itinerary);
        navigate('/');
    };

    const handleDeleteItinerary = async (id) => {
        try {
            const response = await fetch(`${API_URL}/itinerary/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user}`,
                },
            });

            if (response.ok) {
                setIdToDelete(id);
                setAlert({ message: 'Itinerary deleted successfully.', type: 'success' });
            } else {
                setAlert({ message: `Error deleting itinerary: ${response.status}`, type: 'error' });
            }
        } catch (error) {
            setAlert({ message: `Error deleting itinerary: ${error.message}`, type: 'error' });
        }
    };

    return (
        <div className="container mx-auto p-4">
            {alert.message && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert({ message: '', type: '' })}
                />
            )}
            <h1 className="text-3xl font-bold mb-6 text-center">My Plans</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userItineraries.length === 0 && "No itineraries found."}
                {userItineraries.map((itinerary, index) => (
                    <div key={index} className="border p-4 rounded shadow-md">
                        <h3 className="text-xl font-semibold mb-2">{itinerary.source} to {itinerary.destination}</h3>
                        <p><strong>From:</strong> {new Date(itinerary.fromDate).toLocaleDateString()}</p>
                        <p><strong>To:</strong> {new Date(itinerary.toDate).toLocaleDateString()}</p>
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => handleViewItinerary(itinerary.itinerary)}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                            >
                                View Itinerary
                            </button>
                            <button
                                onClick={() => handleDeleteItinerary(itinerary.id)}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                            >
                                Delete Itinerary
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPlans;