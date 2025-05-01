import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import Header from '../Header';

export default function HospitalRequestsList() {
  // Mock data for demonstration
  const hospitalRequests = [
    {
      id: '001',
      hospitalName: 'Riverside Community Medical Center',
      hospitalAddress: '456 River Ave., Townsville',
      contactInfo: '(555) 987-6543',
      bloodType: 'A+',
      unitsRequested: '3',
      requestDate: '2023-11-15',
      dateNeeded: '2023-11-20',
    },
    {
      id: '002',
      hospitalName: 'Central City Hospital',
      hospitalAddress: '789 Main St., Central City',
      contactInfo: '(555) 123-4567',
      bloodType: 'O-',
      unitsRequested: '5',
      requestDate: '2023-11-16',
      dateNeeded: '2023-11-21',
    },
    {
      id: '003',
      hospitalName: 'Westside Medical Center',
      hospitalAddress: '321 West Blvd., Westville',
      contactInfo: '(555) 765-4321',
      bloodType: 'B+',
      unitsRequested: '2',
      requestDate: '2023-11-17',
      dateNeeded: '2023-11-22',
    },
  ];

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Header />

      <div className="flex justify-center items-center pt-4 pb-6">
        <div className="bg-[#F2F2F2] p-4 rounded-full w-[90%] sm:w-[60%] md:w-[35%] text-center">
          <h1 className="text-[#C91C1C] text-xl font-bold">Hospital Blood Requests</h1>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="bg-[#FFE7E7] p-6 rounded-lg w-full max-w-[1200px] mx-auto">
          <div className="bg-white p-4 rounded-lg mx-auto overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-[#C91C1C] text-white">
                  <th className="py-3 px-4 text-left">Hospital Name</th>
                  <th className="py-3 px-4 text-left">Hospital Address</th>
                  <th className="py-3 px-4 text-left">Blood Type</th>
                  <th className="py-3 px-4 text-left">Units</th>
                  <th className="py-3 px-4 text-left">Date Needed</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hospitalRequests.map((request, index) => (
                  <tr 
                    key={request.id} 
                    className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="py-3 px-4">{request.hospitalName}</td>
                    <td className="py-3 px-4">{request.hospitalAddress}</td>
                    <td className="py-3 px-4">{request.bloodType}</td>
                    <td className="py-3 px-4">{request.unitsRequested}</td>
                    <td className="py-3 px-4">{request.dateNeeded}</td>
                    <td className="py-3 px-4 text-center">
                      <Link
                        to={{
                          pathname: "/request-details",
                          state: {
                            bloodType: request.bloodType,
                            unitsRequested: request.unitsRequested,
                            requestDate: request.requestDate,
                            dateNeeded: request.dateNeeded,
                          },
                        }}
                        className="inline-flex items-center justify-center bg-[#C91C1C] text-white py-1 px-3 rounded hover:bg-red-700"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 