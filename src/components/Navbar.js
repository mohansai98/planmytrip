import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth } from './AuthContext';
import { useItinerary } from './ItineraryContext';

const Navbar = () => {
    const { user, name } = useAuth();
    const { setItinerary } = useItinerary();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleItineraryPlannerClick = () => {
        setItinerary(null);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 p-4 shadow-md">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link to="/" onClick={handleItineraryPlannerClick} className="text-white font-bold text-xl">
                        Plan My Trip
                    </Link>
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/my-plans" className="text-white hover:text-yellow-300 transition duration-200">My Plans</Link>
                                <span className="text-white">Welcome, {name}</span>
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-yellow-300 transition duration-200">Login</Link>
                                <Link to="/register" className="bg-yellow-500 text-green-800 px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200">Register</Link>
                            </>
                        )}
                    </div>
                    <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden mt-4">
                        {user ? (
                            <>
                                <Link to="/my-plans" className="block text-white py-2" onClick={toggleMenu}>My Plans</Link>
                                <span className="block text-white py-2">Welcome, {name}</span>
                                <LogoutButton onClick={toggleMenu} />
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-white py-2" onClick={toggleMenu}>Login</Link>
                                <Link to="/register" className="block text-white py-2" onClick={toggleMenu}>Register</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>


    );
};

export default Navbar;