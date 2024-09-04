import React from 'react';
import { Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <span>Connect on LinkedIn:</span>
                        <a 
                            href="https://www.linkedin.com/in/mohan-sai-singu/" 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-600 transition-colors duration-200 flex items-center"
                        >
                            <Linkedin size={16} className="mr-1" />
                            Mohan Sai Singu
                        </a>
                    </div>
                    <div>
                        &copy; {new Date().getFullYear()} Plan My Trip. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;