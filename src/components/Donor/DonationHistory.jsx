import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Header from '../Header';
import RefreshLink from '../RefreshLink';

// Mock data for donation history
const donationHistory = [
  { date: '2025-04-20', location: "St. Mary's General Hospital", quantity: '5 units', status: 'Pending' },
  { date: '2025-04-20', location: "St. Mary's General Hospital", quantity: '5 units', status: 'Fulfilled' },
  { date: '2025-03-15', location: "Cityview Medical Center", quantity: '10 units', status: 'Fulfilled' },
  { date: '2025-03-15', location: "Cityview Medical Center", quantity: '10 units', status: 'Rejected' },
  { date: '2025-02-28', location: "Pinecrest Medical Center", quantity: '9 units', status: 'Fulfilled' },
  { date: '2025-01-10', location: "Mount Hope Regional Hospital", quantity: '12 units', status: 'Rejected' },
  { date: '2024-12-05', location: "Cityview Medical Center", quantity: '7 units', status: 'Fulfilled' },
  { date: '2024-11-12', location: "Lakeside General Hospital", quantity: '6 units', status: 'Rejected' },
];

const DonationHistory = () => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Fulfilled':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4F5]">
      <Header />
      
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="mb-6">
          <RefreshLink 
            to="/profile-page" 
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={20} className="mr-1" />
            <span>Back to Profile</span>
          </RefreshLink>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#C91C1C]">Donation History</h1>
        </div>
        
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-[#C91C1C] text-white">
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donationHistory.map((donation, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-6">{donation.date}</td>
                  <td className="py-3 px-6">{donation.location}</td>
                  <td className="py-3 px-6">{donation.quantity}</td>
                  <td className="py-3 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(donation.status)}`}>
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
