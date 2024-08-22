import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);
const API_URL = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_URL}/auth/validate-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
            setName(data.name);
            setUser({ token });
        } else {
            setUser(null);
            localStorage.removeItem('token');
        }
      })
      .catch(error => {
        setUser(null);
        console.error('Error validating token:', error);
        localStorage.removeItem('token');
      });
    }
  }, []);

  const login = (token, name) => {
    localStorage.setItem('token', token);
    setUser({ token });
    setName(name);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    if (location.pathname === '/my-plans') {
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
