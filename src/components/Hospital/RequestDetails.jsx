import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, ChevronUp, ChevronDown, Search, ArrowLeft, Calendar, Hospital, Droplet, Package, Building, MoreHorizontal } from 'lucide-react';
import Header from '../Header';

export default function HospitalRequestsList() {
  const navigate = useNavigate();
  // Mock data for demonstration
  const hospitalRequestsData = [
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

  // State for sorting and filtering
  const [hospitalRequests, setHospitalRequests] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState({
    hospitalName: '',
    bloodType: '',
    dateNeeded: '',
  });

  // Initialize data
  useEffect(() => {
    setHospitalRequests(hospitalRequestsData);
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
  const filteredAndSortedRequests = React.useMemo(() => {
    // First filter the data
    let filteredData = [...hospitalRequestsData];
    
    if (filters.hospitalName) {
      filteredData = filteredData.filter(item => 
        item.hospitalName.toLowerCase().includes(filters.hospitalName.toLowerCase())
      );
    }
    
    if (filters.bloodType) {
      filteredData = filteredData.filter(item => 
        item.bloodType.toLowerCase().includes(filters.bloodType.toLowerCase())
      );
    }
    
    if (filters.dateNeeded) {
      filteredData = filteredData.filter(item => 
        item.dateNeeded.includes(filters.dateNeeded)
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
  }, [hospitalRequestsData, filters, sortConfig]);

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-4 sm:py-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-red-600 font-medium hover:text-red-800 transition duration-200 bg-white shadow-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg mb-4 sm:mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
          Back to Dashboard
        </button>

        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-red-100 to-red-50 p-4 sm:p-5 rounded-xl shadow-sm border border-red-200 mb-5 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-red-800 flex items-center">
              <Hospital className="mr-2 h-5 sm:h-6 w-5 sm:w-6 text-red-600" />
              Hospital Blood Requests
            </h1>
            <p className="text-red-600 mt-1 text-sm sm:text-base">View and manage blood requests from hospitals</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-red-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Total Requests</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">{filteredAndSortedRequests.length}</p>
                </div>
                <div className="bg-red-100 p-2 sm:p-3 rounded-full">
                  <Package className="h-4 sm:h-5 w-4 sm:w-5 text-red-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Total Units Requested</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {filteredAndSortedRequests.reduce(
                      (sum, request) => sum + parseInt(request.unitsRequested), 0
                    )}
                  </p>
                </div>
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                  <Droplet className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-indigo-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Hospitals</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {new Set(filteredAndSortedRequests.map(r => r.hospitalName)).size}
                  </p>
                </div>
                <div className="bg-indigo-100 p-2 sm:p-3 rounded-full">
                  <Building className="h-4 sm:h-5 w-4 sm:w-5 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm mb-5 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Filter Requests</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Hospital Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="hospitalName"
                    value={filters.hospitalName}
                    onChange={handleFilterChange}
                    className="block w-full pl-10 py-2 sm:py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="Search hospital name"
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
                    className="block w-full pl-10 py-2 sm:py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="A+, B-, O+, etc."
                  />
                </div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Date Needed</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="dateNeeded"
                    value={filters.dateNeeded}
                    onChange={handleFilterChange}
                    className="block w-full pl-10 py-2 sm:py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('hospitalName')}>
                      Hospital {getSortIcon('hospitalName')}
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('bloodType')}>
                      Blood Type {getSortIcon('bloodType')}
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('unitsRequested')}>
                      Units {getSortIcon('unitsRequested')}
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('dateNeeded')}>
                      Needed By {getSortIcon('dateNeeded')}
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <div className="font-medium text-gray-900">{request.hospitalName}</div>
                        <div className="text-gray-500 text-xs truncate max-w-[200px]">{request.hospitalAddress}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {request.bloodType}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                        {request.unitsRequested} units
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <div className="text-gray-700">{new Date(request.dateNeeded).toLocaleDateString()}</div>
                        <div className="text-gray-500 text-xs">Requested on: {new Date(request.requestDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-right">
                        <div className="flex justify-end">
                          <button
                            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 p-1.5 rounded-md transition-colors mr-1"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <div className="relative group">
                            <button
                              className="bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 p-1.5 rounded-md transition-colors"
                              title="More Actions"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 hidden group-hover:block">
                              <div className="py-1">
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                  Approve Request
                                </button>
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                  Reject Request
                                </button>
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                  Contact Hospital
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredAndSortedRequests.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-gray-500 text-sm">No requests found matching your filters.</p>
                <button 
                  className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
                  onClick={() => setFilters({ hospitalName: '', bloodType: '', dateNeeded: '' })}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 