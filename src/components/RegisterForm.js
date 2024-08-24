import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const API_URL = process.env.REACT_APP_API_URL;

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({ message: 'Passwords do not match', type: 'error' });
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setAlert({ message: 'Registration successful! Please check your email to verify your account.', type: 'success' });
                setTimeout(() => {
                    navigate('/login');
                }, 5000);  
            } else {
                setAlert({ message: data.message || 'Registration failed, please try again.', type: 'error' });
            }
        } catch (error) {
            setAlert({ message: 'An error occurred during registration.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {alert.message && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert({ message: '', type: '' })}
                />
            )}
            <div className="container mx-auto p-4 flex justify-center">
                <div className="max-w-md w-full bg-stone-50 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4 text-stone-800">Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;