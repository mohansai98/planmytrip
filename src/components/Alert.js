import React from 'react';
import { X } from 'lucide-react';

const Alert = ({ message, onClose, type }) => {
    const alertStyles = {
        success: 'bg-green-100 text-green-800 border-green-300',
        error: 'bg-red-100 text-red-800 border-red-300',
        info: 'bg-blue-100 text-blue-800 border-blue-300',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };

    return (
        <div
            className={`p-4 mb-4 border rounded-lg ${alertStyles[type]} flex items-center justify-between shadow-md`}
            role="alert"
        >
            <span className="text-sm font-medium">{message}</span>
            <button
                type="button"
                className="ml-4 p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-600 transition duration-200"
                onClick={onClose}
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Alert;