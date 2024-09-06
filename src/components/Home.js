import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Brain, Map } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold m-3 text-center">AI-Powered Trip Planning</h1>
            <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
                Experience intelligent itinerary creation with OpenAI and visualize your journey with Google Maps.
            </p>
            <Link 
                to="/plan" 
                className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 transform hover:scale-105"
            >
                Create Your Itinerary
            </Link>
            <div className="m-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
                <FeatureCard
                    icon={<Brain className="w-10 h-10 text-blue-500" />}
                    title="AI-Generated Itineraries"
                    description="Leverage OpenAI to create personalized travel plans."
                />
                <FeatureCard
                    icon={<Map className="w-10 h-10 text-blue-500" />}
                    title="Google Maps Integration"
                    description="Visualize your itinerary with interactive maps."
                />
                <FeatureCard
                    icon={<MapPin className="w-10 h-10 text-blue-500" />}
                    title="Place Validation"
                    description="Ensure accuracy with real-time place validation."
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
        {icon}
        <h3 className="text-lg font-semibold mt-4 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default Home;