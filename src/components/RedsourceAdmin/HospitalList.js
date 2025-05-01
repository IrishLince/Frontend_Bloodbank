import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'
import { FiTruck, FiPackage, FiAlertTriangle, FiCalendar, FiFilter, FiRefreshCw } from 'react-icons/fi'

export default function HospitalList() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('hospitals')
  const [filterStatus, setFilterStatus] = useState('all')

  const hospitals = [
    {
      name: "St. Mary's General Hospital",
      location: "123 Maple St., Cityville",
      phone: "(555) 123-4567",
      bloodTypes: "O+, A+, B-, O-",
      requests: 3,
      deliveryStatus: "Scheduled"
    },
    {
      name: "Riverside Community Medical Center",
      location: "456 River Ave., Townsville",
      phone: "(555) 987-6543",
      bloodTypes: "AB+, O-, A+, B-",
      requests: 2,
      deliveryStatus: "Pending"
    },
    {
      name: "Pinecrest Medical Center",
      location: "789 Hill Rd., Greendale",
      phone: "(555) 456-7890",
      bloodTypes: "A-, B+, O+, AB+",
      requests: 0,
      deliveryStatus: "Complete"
    },
    {
      name: "Mount Hope Regional Hospital",
      location: "101 Mountain Dr., Hope City",
      phone: "(555) 222-3333",
      bloodTypes: "O+, A-, A+, B-",
      requests: 1,
      deliveryStatus: "In Transit"
    },
    {
      name: "Cityview Medical Center",
      location: "202 Cityview Blvd., Metropolis",
      phone: "(555) 111-4444",
      bloodTypes: "AB-, B+, A-, O-",
      requests: 0,
      deliveryStatus: "Complete"
    },
    {
      name: "Lakeside General Hospital",
      location: "303 Lakeside Dr., Lakeview",
      phone: "(555) 555-7777",
      bloodTypes: "O-, AB+, A+, B-",
      requests: 4,
      deliveryStatus: "Urgent"
    },
    {
      name: "Sunrise Healthcare Facility",
      location: "606 Sunrise Dr., Sunnyside",
      phone: "(555) 444-6666",
      bloodTypes: "A+, B-, B+, AB-",
      requests: 1,
      deliveryStatus: "Scheduled"
    },
    {
      name: "Evergreen Medical Hospital",
      location: "707 Evergreen Ave., Greentown",
      phone: "(555) 999-8888",
      bloodTypes: "AB-, O+, O-, A+",
      requests: 0,
      deliveryStatus: "Complete"
    }
  ]

  const deliveries = [
    {
      id: "DEL-1001",
      hospital: "St. Mary's General Hospital",
      date: "2023-08-18",
      status: "Scheduled",
      items: "O+ (5 units), A+ (3 units)",
      priority: "Normal"
    },
    {
      id: "DEL-1002",
      hospital: "Riverside Community Medical Center",
      date: "2023-08-19",
      status: "Pending",
      items: "AB+ (2 units), O- (1 unit)",
      priority: "High"
    },
    {
      id: "DEL-1003",
      hospital: "Mount Hope Regional Hospital",
      date: "2023-08-17",
      status: "In Transit",
      items: "A- (4 units)",
      priority: "Normal"
    },
    {
      id: "DEL-1004",
      hospital: "Lakeside General Hospital",
      date: "2023-08-16",
      status: "Urgent",
      items: "O- (3 units), B- (2 units)",
      priority: "Critical"
    }
  ]

  const handleViewRequests = (hospital) => {
    navigate('/requests', { state: { selectedHospital: hospital } })
  }

  const handleCreateDelivery = (hospital) => {
    navigate('/schedule', { state: { selectedHospital: hospital } })
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Complete': return 'bg-green-100 text-green-800'
      case 'In Transit': return 'bg-blue-100 text-blue-800'
      case 'Scheduled': return 'bg-purple-100 text-purple-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Urgent': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredHospitals = 
    filterStatus === 'all' 
      ? hospitals 
      : hospitals.filter(h => h.deliveryStatus === filterStatus)

  const filteredDeliveries = 
    filterStatus === 'all' 
      ? deliveries 
      : deliveries.filter(d => d.status === filterStatus)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-[1920px] mx-auto px-6 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center">
            <span className="bg-gray-100 px-8 py-2 rounded-full text-[#C91C1C]">
              Blood Delivery Management
            </span>
          </h1>
          
          <div className="flex flex-wrap justify-center mt-6 gap-4">
            <button 
              onClick={() => setActiveTab('hospitals')}
              className={`px-6 py-2 rounded-full font-medium ${
                activeTab === 'hospitals' 
                  ? 'bg-[#C91C1C] text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Hospital Directory
            </button>
            <button 
              onClick={() => setActiveTab('deliveries')}
              className={`px-6 py-2 rounded-full font-medium ${
                activeTab === 'deliveries' 
                  ? 'bg-[#C91C1C] text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Delivery Management
            </button>
          </div>
        </div>

        {activeTab === 'hospitals' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Hospital Directory</h2>
              <div className="flex items-center space-x-2">
                <select 
                  className="border rounded-md px-3 py-1.5 text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Pending">Pending</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Complete">Complete</option>
                </select>
                <FiFilter className="text-gray-500" />
              </div>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-600">
                  <th className="text-left p-4 border-b">Hospital</th>
                  <th className="text-left p-4 border-b">Location</th>
                  <th className="text-left p-4 border-b">Blood Types</th>
                  <th className="text-left p-4 border-b">Active Requests</th>
                  <th className="text-left p-4 border-b">Delivery Status</th>
                  <th className="p-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHospitals.map((hospital, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{hospital.name}</div>
                      <div className="text-sm text-gray-500">{hospital.phone}</div>
                    </td>
                    <td className="p-4">{hospital.location}</td>
                    <td className="p-4">{hospital.bloodTypes}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                        hospital.requests > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {hospital.requests}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(hospital.deliveryStatus)}`}>
                        {hospital.deliveryStatus}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center space-x-2">
                      <button
                        onClick={() => handleViewRequests(hospital)}
                        className="px-3 py-1.5 text-sm text-white bg-[#F05B5B] rounded-full hover:bg-[#e04d4d] transition"
                      >
                        View Requests
                      </button>
                      <button
                        onClick={() => handleCreateDelivery(hospital)}
                        className="px-3 py-1.5 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-600 transition flex items-center"
                      >
                        <FiTruck className="mr-1" /> Schedule Delivery
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'deliveries' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow flex items-center border-l-4 border-red-500">
                <div className="p-3 rounded-full bg-red-100 mr-4">
                  <FiAlertTriangle className="text-red-500 text-xl" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Urgent Deliveries</div>
                  <div className="text-2xl font-bold">
                    {deliveries.filter(d => d.status === 'Urgent').length}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow flex items-center border-l-4 border-yellow-500">
                <div className="p-3 rounded-full bg-yellow-100 mr-4">
                  <FiPackage className="text-yellow-500 text-xl" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Pending</div>
                  <div className="text-2xl font-bold">
                    {deliveries.filter(d => d.status === 'Pending').length}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow flex items-center border-l-4 border-blue-500">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <FiTruck className="text-blue-500 text-xl" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">In Transit</div>
                  <div className="text-2xl font-bold">
                    {deliveries.filter(d => d.status === 'In Transit').length}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow flex items-center border-l-4 border-purple-500">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                  <FiCalendar className="text-purple-500 text-xl" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Scheduled</div>
                  <div className="text-2xl font-bold">
                    {deliveries.filter(d => d.status === 'Scheduled').length}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Manage Blood Deliveries</h2>
                <div className="flex space-x-2">
                  <select 
                    className="border rounded-md px-3 py-1.5 text-sm"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Pending">Pending</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Transit">In Transit</option>
                  </select>
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <FiRefreshCw className="mr-1" /> Refresh
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-sm text-gray-600">
                      <th className="text-left p-4 border-b">Delivery ID</th>
                      <th className="text-left p-4 border-b">Hospital</th>
                      <th className="text-left p-4 border-b">Blood Products</th>
                      <th className="text-left p-4 border-b">Date</th>
                      <th className="text-left p-4 border-b">Priority</th>
                      <th className="text-left p-4 border-b">Status</th>
                      <th className="p-4 border-b text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeliveries.map((delivery, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{delivery.id}</td>
                        <td className="p-4">{delivery.hospital}</td>
                        <td className="p-4">{delivery.items}</td>
                        <td className="p-4">{delivery.date}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            delivery.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                            delivery.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {delivery.priority}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(delivery.status)}`}>
                            {delivery.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center space-x-2">
                            <button 
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                              onClick={() => navigate('/schedule', { state: { delivery } })}
                            >
                              Track
                            </button>
                            <button 
                              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                              onClick={() => {
                                // Update status logic would go here
                                alert(`Update status for ${delivery.id}`);
                              }}
                            >
                              Update Status
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={() => navigate('/schedule')}
                className="bg-[#C91C1C] text-white py-2 px-6 rounded-full font-bold hover:bg-[#9e1414] flex items-center"
              >
                <FiTruck className="mr-2" /> Schedule New Delivery
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
