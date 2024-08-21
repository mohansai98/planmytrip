import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth } from './AuthContext';
import { useItinerary } from './ItineraryContext';

const Navbar = () => {
    const { user, name } = useAuth();
    const { setItinerary } = useItinerary();
  
    const handleItineraryPlannerClick = () => {
      setItinerary(null);
    };
    return (
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" onClick={handleItineraryPlannerClick} className="text-white font-bold text-xl">
            Plan My Trip
          </Link>
          <div>
            {user ? (
              <>
                <Link to="/my-plans" className="text-white mr-4 hover:underline">
                  My Plans
                </Link>
                <span className="text-white mr-4">Welcome, {name}</span>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white mr-4 hover:underline"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:underline"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  };
  export default Navbar;