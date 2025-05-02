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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {hospitalName}</h1>
          <p className="text-gray-600">Hospital Blood Logistics Dashboard</p>
        </div>
        <Link
          to="/new-request"
          className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg inline-flex items-center"
        >
          <span>New Blood Request</span>
        </Link>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending Requests</p>
              <p className="text-2xl font-bold">{pendingRequests}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <FiClock className="text-red-600 text-xl" />
            </div>
          </div>
          <Link to="/request-details" className="text-red-600 text-sm mt-4 inline-block">View all requests</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Upcoming Deliveries</p>
              <p className="text-2xl font-bold">{upcomingDeliveries}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FiTruck className="text-blue-600 text-xl" />
            </div>
          </div>
          <Link to="/Track-Deliveries" className="text-blue-600 text-sm mt-4 inline-block">Track deliveries</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Inventory Alerts</p>
              <p className="text-2xl font-bold">{inventoryAlerts.length}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FiAlertCircle className="text-yellow-600 text-xl" />
            </div>
          </div>
          <button className="text-yellow-600 text-sm mt-4 inline-block">View alerts</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Last Delivery</p>
              <p className="text-2xl font-bold">{recentDeliveries[0]?.date || "N/A"}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FiCalendar className="text-green-600 text-xl" />
            </div>
          </div>
          <button className="text-green-600 text-sm mt-4 inline-block">View delivery log</button>
        </div>
      </div>

      {/* Inventory Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Critical Inventory Alerts</h2>
            <Link to="/new-request" className="text-red-600 text-sm">Request blood</Link>
          </div>
          
          {inventoryAlerts.length > 0 ? (
            <div className="space-y-4">
              {inventoryAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${alert.status === 'Critical' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                    <div>
                      <p className="font-medium">Blood Type {alert.type}</p>
                      <p className="text-sm text-gray-500">{alert.quantity} available</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${alert.status === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {alert.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No inventory alerts at this time.</p>
          )}
        </div>

        {/* Scheduled Deliveries */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Upcoming Blood Deliveries</h2>
            <button className="text-blue-600 text-sm">View all</button>
          </div>
          
          {scheduledDeliveries.length > 0 ? (
            <div className="space-y-4">
              {scheduledDeliveries.map((delivery, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FiPackage className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Delivery #{delivery.id}</p>
                      <p className="text-sm text-gray-500">{delivery.items} - {delivery.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    delivery.status === 'In Transit' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {delivery.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No scheduled deliveries at this time.</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Delivery History</h2>
          <button className="text-gray-600 text-sm">View full history</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Products</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentDeliveries.map((delivery, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap">{delivery.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{delivery.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{delivery.items}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View details</button>
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
