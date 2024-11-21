import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserCircle2, ChevronLeft } from 'lucide-react';
import Header from '../Header'

export default function WelcomeMessage() {
  const location = useLocation();

  return (
    <div className="bg-white min-h-screen">
       <Header />
      <div className="flex justify-center items-center py-12">
        <div className="container1 bg-[#EEEEEE] p-6 rounded-lg w-[80%]">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="text-black">Welcome, </span>
                <span className="text-[#C91C1C]">Riverside Community Medical Center Admin</span>
                <span className="text-black">!</span>
              </h1>
              <p className="text-xl mt-4 font-semibold">Overview of pending requests and request history</p>
            </div>
            <Link to="/new-request">
              <button className="bg-[#C91C1C] text-white py-2 px-6 rounded-full font-bold hover:bg-[#9e1414]">New Request</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-start space-x-8 px-8">
        <div className="container2 bg-[#FFE7E7] p-6 rounded-lg w-[40%]">
          <h2 className="text-xl font-bold mb-4">Pending Requests</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white mr-2">O+</div>
              <span>5 units</span>
            </div>
            <div>
              <p>Requested on 11/01</p>
              <p>Status: Pending</p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white mr-2">A-</div>
              <span>3 units</span>
            </div>
            <div>
              <p>Requested on 11/28</p>
              <p>Status: Pending</p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white mr-2">B+</div>
              <span>10 units</span>
            </div>
            <div>
              <p>Requested on 11/30</p>
              <p>Status: Approved</p>
            </div>
          </div>
        </div>

        <div className="container3 bg-[#FFE7E7] p-6 rounded-lg w-[40%]">
          <h2 className="text-xl font-bold mb-4">Request History</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Request Date</th>
                <th className="py-2 px-4 border-b">Blood Type</th>
                <th className="py-2 px-4 border-b">Units</th>
                <th className="py-2 px-4 border-b">Date Needed</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">11/14/2024</td>
                <td className="py-2 px-4 border-b">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white inline-block">O+</div>
                </td>
                <td className="py-2 px-4 border-b">5</td>
                <td className="py-2 px-4 border-b">11/20/2024</td>
                <td className="py-2 px-4 border-b text-[#34751D]">Fulfilled</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">11/12/2024</td>
                <td className="py-2 px-4 border-b">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white inline-block">A+</div>
                </td>
                <td className="py-2 px-4 border-b">10</td>
                <td className="py-2 px-4 border-b">11/18/2024</td>
                <td className="py-2 px-4 border-b text-[#34751D]">Fulfilled</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">11/08/2024</td>
                <td className="py-2 px-4 border-b">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white inline-block">B-</div>
                </td>
                <td className="py-2 px-4 border-b">5</td>
                <td className="py-2 px-4 border-b">11/12/2024</td>
                <td className="py-2 px-4 border-b text-[#34751D]">Fulfilled</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">11/05/2024</td>
                <td className="py-2 px-4 border-b">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white inline-block">B+</div>
                </td>
                <td className="py-2 px-4 border-b">15</td>
                <td className="py-2 px-4 border-b">11/10/2024</td>
                <td className="py-2 px-4 border-b text-[#34751D]">Fulfilled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
