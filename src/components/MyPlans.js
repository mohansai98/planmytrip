import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useItinerary } from './ItineraryContext';
import { useNavigate } from 'react-router-dom';

const MyPlans = () => {
    const { user } = useAuth();
    const { setItinerary } = useItinerary();
    const [userItineraries, setUserItineraries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserItineraries = async () => {
            try {
                const response = await fetch('http://localhost:8080/itinerary/list', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    try {
                        const parsedData = data.map(item => JSON.parse(item));
                        setUserItineraries(parsedData);
                    } catch (error) {
                        console.error('Error parsing user itineraries:', error);
                    }
                } else {
                    console.error('Error fetching user itineraries:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user itineraries:', error);
            }
        };

        if (user) {
            fetchUserItineraries();
        } else {
            navigate('/');
        }
    }, [user, navigate]);

    const handleViewItinerary = (itinerary) => {
        setItinerary(itinerary);
        navigate('/');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">My Plans</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userItineraries.length === 0 && "No itineraries found."}
                {userItineraries.map((itinerary, index) => (
                    <div key={index} className="border p-4 rounded shadow-md">
                        <h3 className="text-xl font-semibold mb-2">{itinerary.source} to {itinerary.destination}</h3>
                        <p><strong>From:</strong> {new Date(itinerary.fromDate).toLocaleDateString()}</p>
                        <p><strong>To:</strong> {new Date(itinerary.toDate).toLocaleDateString()}</p>
                        <button
                            onClick={() => handleViewItinerary(itinerary.itinerary)}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            View Itinerary
                        </button>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPlans;
