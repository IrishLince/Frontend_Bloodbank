import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, ChevronUp, ChevronDown, Search, ArrowLeft } from 'lucide-react';
import Header from '../Header';

export default function UpcomingDeliveries() {
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const deliveriesData = [
    {
      id: '001',
      donorName: 'Juan Dela Cruz',
      bloodType: 'A+',
      units: '2',
      donationDate: '2023-11-25',
      deliveryDate: '2023-11-27',
      status: 'Scheduled',
      hospitalName: 'Riverside Community Medical Center',
    },
    {
      id: '002',
      donorName: 'Maria Santos',
      bloodType: 'O-',
      units: '3',
      donationDate: '2023-11-26',
      deliveryDate: '2023-11-28',
      status: 'In Transit',
      hospitalName: 'Central City Hospital',
    },
    {
      id: '003',
      donorName: 'Pedro Reyes',
      bloodType: 'B+',
      units: '1',
      donationDate: '2023-11-27',
      deliveryDate: '2023-11-30',
      status: 'Scheduled',
      hospitalName: 'Westside Medical Center',
    },
  ];

  // State for sorting and filtering
  const [deliveries, setDeliveries] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState({
    donorName: '',
    bloodType: '',
    deliveryDate: '',
    status: '',
  });

  // Initialize data
  useEffect(() => {
    setDeliveries(deliveriesData);
  }, []);

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? <ChevronUp className="w-4 h-4 inline-block" /> : <ChevronDown className="w-4 h-4 inline-block" />;
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Apply filters and sorting
  const filteredAndSortedDeliveries = React.useMemo(() => {
    // First filter the data
    let filteredData = [...deliveriesData];
    
    if (filters.donorName) {
      filteredData = filteredData.filter(item => 
        item.donorName.toLowerCase().includes(filters.donorName.toLowerCase())
      );
    }
    
    if (filters.bloodType) {
      filteredData = filteredData.filter(item => 
        item.bloodType.toLowerCase().includes(filters.bloodType.toLowerCase())
      );
    }
    
    if (filters.deliveryDate) {
      filteredData = filteredData.filter(item => 
        item.deliveryDate.includes(filters.deliveryDate)
      );
    }
    
    if (filters.status) {
      filteredData = filteredData.filter(item => 
        item.status.toLowerCase().includes(filters.status.toLowerCase())
      );
    }
    
    // Then sort it
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredData;
  }, [deliveriesData, filters, sortConfig]);

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Header />

      <div className="px-4 pt-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-[#C91C1C] font-medium hover:text-red-700 mb-2"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
      </div>

      <div className="flex justify-center items-center pt-2 pb-6">
        <div className="bg-[#F2F2F2] p-4 rounded-full w-[90%] sm:w-[60%] md:w-[35%] text-center">
          <h1 className="text-[#C91C1C] text-xl font-bold">Upcoming Deliveries</h1>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="bg-[#FFE7E7] p-6 rounded-lg w-full max-w-[1200px] mx-auto">
          {/* Filter Section */}
          <div className="bg-white p-4 rounded-lg mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Donor Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="donorName"
                  value={filters.donorName}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-md pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Filter by donor..."
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
              <div className="relative">
                <input
                  type="text"
                  name="bloodType"
                  value={filters.bloodType}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-md pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Filter by blood type..."
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
              <div className="relative">
                <input
                  type="text"
                  name="deliveryDate"
                  value={filters.deliveryDate}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-md pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Filter by date..."
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="relative">
                <input
                  type="text"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-md pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Filter by status..."
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg mx-auto overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-[#C91C1C] text-white">
                  <th 
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => requestSort('donorName')}
                  >
                    Donor Name {getSortIcon('donorName')}
                  </th>
                  <th 
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => requestSort('bloodType')}
                  >
                    Blood Type {getSortIcon('bloodType')}
                  </th>
                  <th 
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => requestSort('units')}
                  >
                    Units {getSortIcon('units')}
                  </th>
                  <th 
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => requestSort('deliveryDate')}
                  >
                    Delivery Date {getSortIcon('deliveryDate')}
                  </th>
                  <th 
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => requestSort('status')}
                  >
                    Status {getSortIcon('status')}
                  </th>
                  <th 
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => requestSort('hospitalName')}
                  >
                    Hospital {getSortIcon('hospitalName')}
                  </th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedDeliveries.length > 0 ? (
                  filteredAndSortedDeliveries.map((delivery, index) => (
                    <tr 
                      key={delivery.id} 
                      className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="py-3 px-4">{delivery.donorName}</td>
                      <td className="py-3 px-4">{delivery.bloodType}</td>
                      <td className="py-3 px-4">{delivery.units}</td>
                      <td className="py-3 px-4">{delivery.deliveryDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          delivery.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                          delivery.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {delivery.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{delivery.hospitalName}</td>
                      <td className="py-3 px-4 text-center">
                        <Link
                          to={{
                            pathname: "/delivery-details",
                            state: {
                              id: delivery.id,
                              donorName: delivery.donorName,
                              bloodType: delivery.bloodType,
                              units: delivery.units,
                              donationDate: delivery.donationDate,
                              deliveryDate: delivery.deliveryDate,
                              status: delivery.status,
                              hospitalName: delivery.hospitalName,
                            },
                          }}
                          className="inline-flex items-center justify-center bg-[#C91C1C] text-white py-1 px-3 rounded hover:bg-red-700"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                      No matching deliveries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 