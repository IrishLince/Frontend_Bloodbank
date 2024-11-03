import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
  
    return (
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Left section with logo */}
            <div className="flex items-center">
              <div className="h-8 w-8 bg-red-600 rounded-full"/>
            </div>
  
           
  
            {/* Right section with navigation and profile */}
            <div className="flex items-center space-x-8">
              {/* Navigation links */}
              <nav className="flex items-center space-x-8">
                <a href="/" className="text-gray-700 hover:text-red-600">Home</a>
                <a href="/hospital" className="text-gray-700 hover:text-red-600">Hospital</a>
                <a href="/booking" className="text-gray-700 hover:text-red-600">Online Booking</a>
                <a href="/about" className="text-gray-700 hover:text-red-600">About Us</a>
              </nav>
  
              {/* Profile settings */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
                >
                  <span>Profile Settings</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-red-50">Profile</a>
                    <a href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-red-50">Settings</a>
                    <a href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-red-50">Logout</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-90" />
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">Donate Blood, Save Lives</h1>
          <p className="text-xl mb-6">
            When you donate blood, you're not just donating a pint;
            you're giving someone a chance to live,
            recover, and continue to make memories.
          </p>
          <p className="text-2xl font-semibold mb-8">
            It's a gift that lasts a lifetime.
          </p>
          <button className="bg-white text-red-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-50">
            DONATE NOW
          </button>
        </div>
      </div>
    </div>
  );
};

const ActionButtons = () => {
  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-red-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700">
            Learn More
          </button>
          <button className="bg-red-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700">
            Check History
          </button>
          <button className="bg-red-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700">
            Find Blood Drive
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ActionButtons />
    </div>
  );
};

export default HomePage;