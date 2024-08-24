import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-50 py-6">
            <div className="container mx-auto px-4">
                <div className="text-center text-sm">
                    <div>
                    Connect on LinkedIn <a className='text-blue-500' href="https://www.linkedin.com/in/mohan-sai-singu/" target="_blank" rel="noreferrer">Mohan Sai Singu</a>
                    </div>
                    &copy; {new Date().getFullYear()} Plan My Trip
                </div>
            </div>
        </footer>
    );
};

export default Footer;
