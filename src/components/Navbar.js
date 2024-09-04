import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useItinerary } from './ItineraryContext';
import { Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, name, logout } = useAuth();
    const { itinerary, setItinerary } = useItinerary();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const handleItineraryPlannerClick = () => {
        setItinerary(null);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCreatePlan = () => {
        setItinerary(null);
    };

    const shouldShowCreatePlanButton = location.pathname === '/' || (location.pathname === '/plan' && itinerary === null);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" onClick={handleItineraryPlannerClick} className="text-xl font-bold text-blue-600 hover:text-blue-700 transition duration-200">
                            Plan My Trip
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {!shouldShowCreatePlanButton && (
                            <Link 
                            to="/plan" onClick={handleCreatePlan}
                            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 transform hover:scale-105"
                        >
                            Create Itinerary
                        </Link>
                        )}
                        {user ? (
                            <>
                                <Link to="/my-plans" className="text-blue-600 hover:text-blue-700 transition duration-200 hover:scale-105">
                                    My Plans
                                </Link>
                                <span className="text-gray-600">Welcome, {name}</span>
                                <button onClick={logout} className="text-blue-600 hover:text-blue-700 transition duration-200 flex items-center hover:scale-105">
                                    <LogOut size={18} className="mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-blue-600 hover:text-blue-700 transition duration-200 hover:scale-105">
                                    Login
                                </Link>
                                <Link to="/register" className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 focus:outline-none">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {!shouldShowCreatePlanButton && (
                            <Link to="/plan" onClick={() => { handleCreatePlan(); toggleMenu(); }} className="text-center block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 transform">
                                Create Itinerary
                            </Link>
                        )}
                        {user ? (
                            <>
                                <Link to="/my-plans" className="block text-blue-600 hover:text-blue-700 transition duration-200 py-2" onClick={toggleMenu}>
                                    My Plans
                                </Link>
                                <span className="block text-gray-600 py-2">Welcome, {name}</span>
                                <button onClick={() => { logout(); toggleMenu(); }} className="w-full text-blue-600 hover:text-blue-700 transition duration-200 py-2 flex items-center">
                                    <LogOut size={18} className="mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-center block text-blue-600 hover:text-blue-700 transition duration-200 py-2" onClick={toggleMenu}>
                                    Login
                                </Link>
                                <Link to="/register" className="text-center block text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200" onClick={toggleMenu}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
