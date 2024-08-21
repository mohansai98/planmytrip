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
    <nav className="bg-blue-600 p-4 md:p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" onClick={handleItineraryPlannerClick} className="underline text-white font-bold text-xl mb-4 md:mb-0">
          Plan My Trip
        </Link>
        <div className="flex items-center">
          {user ? (
            <>
              <Link to="/my-plans">
                
                <button className="bg-blue-500 text-white py-1 px-2 rounded-md ml-2 mr-4">My Plans</button>
              </Link>
              <span className="text-white mr-4">Welcome, {name}</span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4 hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-white hover:underline">
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