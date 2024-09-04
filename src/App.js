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
import Home from './components/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ItineraryProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plan" element={<ItineraryPlanner />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/my-plans" element={<MyPlans />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ItineraryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;