import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react'; 
import Header from '../Header';

export default function RequestDetails() {
  const location = useLocation();
  const { bloodType, unitsRequested, requestDate, dateNeeded } = location.state || {};

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Header />

      <div className="flex justify-end px-6 py-4">
        <Link to="/successful-login">
          <button className="flex items-center text-gray-600 text-sm">
            <span>PROCEED</span> <ChevronRight className="ml-1" />
          </button>
        </Link>
      </div>

      <div className="flex justify-center items-center pt-2 pb-4">
        <div className="container1 bg-[#F2F2F2] p-4 rounded-full w-[35%] text-center">
          <h1 className="text-[#C91C1C] text-xl font-bold">Your Request Details</h1>
        </div>
      </div>

      <div className="flex justify-center items-start pt-2 pb-8 px-8">
        <div className="container2 bg-[#FFE7E7] p-6 rounded-lg w-[70%]">
          <div className="container3 bg-white p-4 rounded-lg space-y-4 w-[80%] mx-auto"> 
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <label className="font-bold text-black w-1/3">HOSPITAL NAME:</label>
              <p className="w-2/3 text-black">Riverside Community Medical Center</p>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <label className="font-bold text-black w-1/3">HOSPITAL ADDRESS:</label>
              <p className="w-2/3 text-black">456 River Ave., Townsville</p>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <label className="font-bold text-black w-1/3">CONTACT INFORMATION:</label>
              <p className="w-2/3 text-black">(555) 987-6543</p>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <label className="font-bold text-black w-1/3">BLOOD TYPE:</label>
              <p className="w-2/3 text-black">{bloodType || 'Not Provided'}</p>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <label className="font-bold text-black w-1/3">UNITS REQUESTED:</label>
              <p className="w-2/3 text-black">{unitsRequested || 'Not Provided'}</p>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <label className="font-bold text-black w-1/3">REQUEST DATE:</label>
              <p className="w-2/3 text-black">{requestDate || 'Not Provided'}</p>
            </div>
            <div className="flex justify-between items-center py-2">
              <label className="font-bold text-black w-1/3">DATE NEEDED:</label>
              <p className="w-2/3 text-black">{dateNeeded || 'Not Provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
