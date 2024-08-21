// components/Alert.js
import React from 'react';

const Alert = ({ message, onClose, type }) => {
    const alertStyles = {
        success: 'bg-green-100 text-green-800 border-green-300',
        error: 'bg-red-100 text-red-800 border-red-300',
        info: 'bg-blue-100 text-blue-800 border-blue-300',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };

    return (
        <div
            className={`p-4 mb-4 border rounded-md ${alertStyles[type]} flex items-center justify-between`}
            role="alert"
        >
            <span>{message}</span>
            <button
                type="button"
                className="ml-4 p-1 rounded-full hover:bg-gray-200"
                onClick={onClose}
            >
                <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Alert;
