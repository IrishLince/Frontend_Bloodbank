import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/CoverPreviehomepage.png';

const SuccessfulLogin = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Header isLoggedIn={true} />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[calc(100vh-4rem)] flex items-center sm:justify-end justify-center">
        <div className="text-[#490008] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl text-center sm:text-right">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Donate Blood, Save Lives</h1>
          <p className="text-lg sm:text-xl mb-6">
            When you donate blood, you're not just donating a pint;
            you're giving someone a chance to live,
            recover, and continue to make memories.
          </p>
          <p className="text-xl sm:text-2xl font-semibold mb-8">
            It's a gift that lasts a lifetime.
          </p>
          <Link
            to="/donate"
            className="inline-block bg-red-800 hover:bg-red-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-colors duration-200"
          >
            DONATE NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulLogin;