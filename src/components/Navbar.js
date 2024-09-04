import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useItinerary } from './ItineraryContext';
import { Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, name, logout } = useAuth();
    const { setItinerary } = useItinerary();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleItineraryPlannerClick = () => {
        setItinerary(null);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" onClick={handleItineraryPlannerClick} className="text-xl font-bold text-blue-600">
                            Plan My Trip
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/my-plans" className="text-gray-600 hover:text-blue-600 transition duration-200">My Plans</Link>
                                <span className="text-gray-600">Welcome, {name}</span>
                                <button onClick={logout} className="text-gray-600 hover:text-blue-600 transition duration-200 flex items-center">
                                    <LogOut size={18} className="mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition duration-200">Login</Link>
                                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">Register</Link>
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
                        {user ? (
                            <>
                                <Link to="/my-plans" className="block text-gray-600 hover:text-blue-600 transition duration-200 py-2" onClick={toggleMenu}>My Plans</Link>
                                <span className="block text-gray-600 py-2">Welcome, {name}</span>
                                <button onClick={() => { logout(); toggleMenu(); }} className="w-full text-left text-gray-600 hover:text-blue-600 transition duration-200 py-2 flex items-center">
                                    <LogOut size={18} className="mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-gray-600 hover:text-blue-600 transition duration-200 py-2" onClick={toggleMenu}>Login</Link>
                                <Link to="/register" className="block text-gray-600 hover:text-blue-600 transition duration-200 py-2" onClick={toggleMenu}>Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;