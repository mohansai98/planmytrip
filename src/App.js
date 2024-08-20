import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ItineraryPlanner from './components/ItineraryPlanner';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { AuthProvider, useAuth } from './components/AuthContext';
import LogoutButton from './components/LogoutButton';
import { ItineraryProvider, useItinerary } from './components/ItineraryContext';
import MyPlans from './components/MyPlans';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

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

function App() {
  return (
    <Router>
      <AuthProvider>
        <ItineraryProvider>

          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<ItineraryPlanner />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/my-plans" element={<MyPlans />} />
            </Routes>
          </div>
        </ItineraryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
