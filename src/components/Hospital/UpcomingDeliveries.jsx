import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, ChevronUp, ChevronDown, Search, ArrowLeft, Calendar, User, Droplet, Box, Clock } from 'lucide-react';
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
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-4 sm:py-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-[#C91C1C] font-medium hover:text-red-700 transition duration-200 bg-white shadow-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg mb-4 sm:mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
          Back to Dashboard
        </button>

        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-red-100 to-red-50 p-4 sm:p-5 rounded-xl shadow-sm border border-red-200 mb-5 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-red-800 flex items-center">
              <Calendar className="mr-2 h-5 sm:h-6 w-5 sm:w-6 text-red-600" />
              Upcoming Blood Deliveries
            </h1>
            <p className="text-red-600 mt-1 text-sm sm:text-base">Monitor and track your incoming blood deliveries</p>
          </div>

          {/* Filter Section */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm mb-5 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Filter Deliveries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Donor Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="donorName"
                    value={filters.donorName}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 text-sm"
                    placeholder="Search by donor..."
                  />
                </div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Blood Type</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Droplet className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="bloodType"
                    value={filters.bloodType}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 text-sm"
                    placeholder="Filter by type..."
                  />
                </div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Delivery Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={filters.deliveryDate}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Status</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 text-sm appearance-none"
                  >
                    <option value="">All Statuses</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Transit">In Transit</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Total Deliveries</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">{filteredAndSortedDeliveries.length}</p>
                </div>
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                  <Box className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">In Transit</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {filteredAndSortedDeliveries.filter(d => d.status === 'In Transit').length}
                  </p>
                </div>
                <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                  <span className="flex h-4 sm:h-5 w-4 sm:w-5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 sm:h-5 w-4 sm:w-5 bg-green-500 items-center justify-center">
                      <Clock className="h-2.5 sm:h-3 w-2.5 sm:w-3 text-white" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-yellow-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Scheduled</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {filteredAndSortedDeliveries.filter(d => d.status === 'Scheduled').length}
                  </p>
                </div>
                <div className="bg-yellow-100 p-2 sm:p-3 rounded-full">
                  <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Deliveries List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('donorName')}>
                      Donor {getSortIcon('donorName')}
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('bloodType')}>
                      Blood Type {getSortIcon('bloodType')}
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('units')}>
                      Units {getSortIcon('units')}
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('deliveryDate')}>
                      Delivery Date {getSortIcon('deliveryDate')}
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('status')}>
                      Status {getSortIcon('status')}
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedDeliveries.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <div className="font-medium text-gray-900">{delivery.donorName}</div>
                        <div className="text-gray-500 text-xs truncate max-w-[120px] sm:max-w-[200px]">{delivery.hospitalName}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {delivery.bloodType}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                        {delivery.units} units
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <div className="text-gray-700">{new Date(delivery.deliveryDate).toLocaleDateString()}</div>
                        <div className="text-gray-500 text-xs">Donated: {new Date(delivery.donationDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium ${
                          delivery.status === 'In Transit' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {delivery.status === 'In Transit' && (
                            <span className="flex h-1.5 w-1.5 relative mr-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                            </span>
                          )}
                          {delivery.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center">
                        <button
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 p-1.5 rounded-md transition-colors inline-flex items-center"
                          title="View Details"
                        >
                          <Eye className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-1" />
                          <span className="hidden sm:inline">Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredAndSortedDeliveries.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-gray-500 text-sm">No deliveries found matching your filters.</p>
                  <button 
                    className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
                    onClick={() => setFilters({ donorName: '', bloodType: '', deliveryDate: '', status: '' })}
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 