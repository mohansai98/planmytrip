import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const API_URL = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });

    const handleRequestReset = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/request-reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setAlert({ message: 'A reset code has been sent to your email.', type: 'success' });
                setTimeout(() => {
                    navigate('/reset-password', { state: { email } });
                }, 5000);           
            } else {
                setAlert({ message: data.message || 'Failed to send reset code, please try again.', type: 'error' });
            }
        } catch (error) {
            setAlert({ message: 'An error occurred while requesting a password reset.', type: 'error' });
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
                <h2 className="text-2xl font-bold mb-4 text-stone-800">Forgot Password</h2>
                <form onSubmit={handleRequestReset}>
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
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Requesting...' : 'Request Reset'}
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default ForgotPassword;