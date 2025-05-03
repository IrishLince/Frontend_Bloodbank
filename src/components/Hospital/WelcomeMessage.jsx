import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle, FiClock, FiTruck, FiCalendar, FiPackage } from 'react-icons/fi';

const WelcomeMessage = () => {
  const hospitalName = localStorage.getItem('username') || 'Hospital';
  
  // Mock data for hospital logistics
  const pendingRequests = 3;
  const upcomingDeliveries = 2;
  const inventoryAlerts = [
    { type: 'A+', status: 'Low', quantity: '2 units' },
    { type: 'O-', status: 'Critical', quantity: '1 unit' },
  ];
  const recentDeliveries = [
    { id: 'DEL-1234', date: '2023-08-15', items: 'A+ (3 units)', status: 'Delivered' },
    { id: 'DEL-1235', date: '2023-08-10', items: 'B- (2 units)', status: 'Delivered' },
  ];
  const scheduledDeliveries = [
    { id: 'DEL-1236', date: '2023-08-20', items: 'O+ (4 units)', status: 'In Transit' },
    { id: 'DEL-1237', date: '2023-08-22', items: 'AB+ (1 unit)', status: 'Scheduled' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 bg-[#F9F9FB] min-h-screen">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-red-600">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Welcome, {hospitalName}</h1>
          <p className="text-gray-600">Hospital Blood Logistics Dashboard</p>
        </div>
        <Link
          to="/new-request"
          className="mt-4 md:mt-0 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg inline-flex items-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 w-full md:w-auto justify-center md:justify-start"
        >
          <span className="font-medium">New Blood Request</span>
        </Link>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Pending Requests</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">{pendingRequests}</p>
            </div>
            <div className="bg-red-100 p-2 sm:p-3 rounded-full shadow-inner">
              <FiClock className="text-red-600 text-lg sm:text-xl" />
            </div>
          </div>
          <Link to="/request-details" className="text-red-600 text-sm font-medium mt-3 sm:mt-4 inline-flex items-center hover:text-red-800">
            View all requests
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Upcoming Deliveries</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">{upcomingDeliveries}</p>
            </div>
            <div className="bg-blue-100 p-2 sm:p-3 rounded-full shadow-inner">
              <FiTruck className="text-blue-600 text-lg sm:text-xl" />
            </div>
          </div>
          <Link to="/Track-Deliveries" className="text-blue-600 text-sm font-medium mt-3 sm:mt-4 inline-flex items-center hover:text-blue-800">
            Track deliveries
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Inventory Alerts</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">{inventoryAlerts.length}</p>
            </div>
            <div className="bg-yellow-100 p-2 sm:p-3 rounded-full shadow-inner">
              <FiAlertCircle className="text-yellow-600 text-lg sm:text-xl" />
            </div>
          </div>
          <button className="text-yellow-600 text-sm font-medium mt-3 sm:mt-4 inline-flex items-center hover:text-yellow-800">
            View alerts
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Last Delivery</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">{recentDeliveries[0]?.date || "N/A"}</p>
            </div>
            <div className="bg-green-100 p-2 sm:p-3 rounded-full shadow-inner">
              <FiCalendar className="text-green-600 text-lg sm:text-xl" />
            </div>
          </div>
          <button className="text-green-600 text-sm font-medium mt-3 sm:mt-4 inline-flex items-center hover:text-green-800">
            View delivery log
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Inventory Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Critical Inventory Alerts</h2>
            <Link to="/new-request" className="text-red-600 text-sm font-medium hover:text-red-800 inline-flex items-center">
              Request blood
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {inventoryAlerts.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {inventoryAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-gray-50 border-l-4 border-r-4 border-l-red-500 border-r-transparent hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 sm:mr-3 ${alert.status === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                    <div>
                      <p className="font-medium text-gray-800">Blood Type {alert.type}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{alert.quantity} available</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${alert.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {alert.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-green-50 p-4 sm:p-6 rounded-lg text-center">
              <p className="text-green-600 font-medium">No inventory alerts at this time.</p>
            </div>
          )}
        </div>

        {/* Scheduled Deliveries */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Upcoming Blood Deliveries</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800 inline-flex items-center">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {scheduledDeliveries.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {scheduledDeliveries.map((delivery, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-gray-50 border-l-4 border-blue-500 hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 shadow-inner">
                      <FiPackage className="text-blue-600 text-sm sm:text-base" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">Delivery #{delivery.id}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{delivery.items} - {delivery.date}</p>
                    </div>

                  </div>
                  <span className={`text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${
                    delivery.status === 'In Transit' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {delivery.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg text-center">
              <p className="text-gray-600 font-medium">No scheduled deliveries at this time.</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Recent Delivery History</h2>
          <button className="text-gray-600 text-sm font-medium hover:text-gray-800 inline-flex items-center">
            View full history
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-x-auto bg-gray-50 rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="text-xs">
              <tr>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">ID</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">Date</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">Products</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">Status</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-xs sm:text-sm">
              {recentDeliveries.map((delivery, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap font-medium">{delivery.id}</td>
                  <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">{delivery.date}</td>
                  <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">{delivery.items}</td>
                  <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 sm:h-4 w-3 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      View details
                    </button>
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

export default WelcomeMessage;
