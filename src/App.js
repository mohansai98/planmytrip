import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItineraryPlanner from './components/ItineraryPlanner';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { AuthProvider } from './components/AuthContext';
import { ItineraryProvider } from './components/ItineraryContext';
import MyPlans from './components/MyPlans';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
          <Footer />
        </ItineraryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
