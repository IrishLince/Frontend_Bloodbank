import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, ChevronUp, ChevronDown, Search, ArrowLeft, Calendar, Hospital, Droplet, Package, Building, MoreHorizontal, Check, X, MessageCircle, AlertCircle, Phone, Mail } from 'lucide-react';
import Header from '../Header';

export default function HospitalBloodRequestsList() {
  const navigate = useNavigate();
  // Mock data for demonstration - updated to include multiple blood types per request
  const bloodRequestsData = [
    {
      id: '001',
      bloodBankName: 'Central Blood Bank',
      bloodBankAddress: '123 Main Street, Downtown',
      contactInfo: '(555) 123-4567',
      email: 'contact@centralbloodbank.com',
      bloodRequests: [
        { bloodType: 'A+', unitsRequested: '3' },
        { bloodType: 'O-', unitsRequested: '2' }
      ],
      requestDate: '2023-11-15',
      dateNeeded: '2023-11-20',
      status: 'Pending'
    },
    {
      id: '002',
      bloodBankName: 'Regional Blood Center',
      bloodBankAddress: '456 Oak Avenue, Northside',
      contactInfo: '(555) 987-6543',
      email: 'info@regionalblood.org',
      bloodRequests: [
        { bloodType: 'O-', unitsRequested: '5' }
      ],
      requestDate: '2023-11-16',
      dateNeeded: '2023-11-21',
      status: 'Processing'
    },
    {
      id: '003',
      bloodBankName: 'National Blood Services',
      bloodBankAddress: '789 Pine Road, Eastville',
      contactInfo: '(555) 765-4321',
      email: 'support@nationalblood.com',
      bloodRequests: [
        { bloodType: 'B+', unitsRequested: '2' },
        { bloodType: 'AB-', unitsRequested: '1' },
        { bloodType: 'A-', unitsRequested: '3' }
      ],
      requestDate: '2023-11-17',
      dateNeeded: '2023-11-22',
      status: 'Pending'
    },
  ];

  // State for sorting and filtering
  const [bloodRequests, setBloodRequests] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState({
    bloodBankName: '',
    bloodType: '',
    dateNeeded: '',
    status: ''
  });
  
  // State for modals
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Initialize data
  useEffect(() => {
    setBloodRequests(bloodRequestsData);
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

  // Handle view details
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setDetailsModalOpen(true);
  };

  // Handle cancel request click
  const handleCancelClick = (request) => {
    setSelectedRequest(request);
    setCancelModalOpen(true);
  };

  // Confirm cancel request
  const confirmCancelRequest = () => {
    // In a real app, this would make an API call
    const updatedRequests = bloodRequests.map(req => 
      req.id === selectedRequest.id ? { ...req, status: 'Cancelled' } : req
    );
    setBloodRequests(updatedRequests);
    setCancelModalOpen(false);
  };

  // Calculate total units requested for a request
  const getTotalUnits = (request) => {
    return request.bloodRequests.reduce((total, item) => total + parseInt(item.unitsRequested), 0);
  };

  // Apply filters and sorting
  const filteredAndSortedRequests = React.useMemo(() => {
    // First filter the data
    let filteredData = [...bloodRequests];
    
    if (filters.bloodBankName) {
      filteredData = filteredData.filter(item => 
        item.bloodBankName.toLowerCase().includes(filters.bloodBankName.toLowerCase())
      );
    }
    
    if (filters.bloodType) {
      filteredData = filteredData.filter(item => 
        item.bloodRequests.some(req => 
          req.bloodType.toLowerCase().includes(filters.bloodType.toLowerCase())
        )
      );
    }
    
    if (filters.dateNeeded) {
      filteredData = filteredData.filter(item => 
        item.dateNeeded.includes(filters.dateNeeded)
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
  }, [bloodRequests, filters, sortConfig]);

  // Count requests by status
  const pendingRequests = filteredAndSortedRequests.filter(r => r.status === 'Pending').length;
  const processingRequests = filteredAndSortedRequests.filter(r => r.status === 'Processing').length;

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
              My Blood Requests
            </h1>
            <p className="text-red-600 mt-1 text-sm sm:text-base">Track and manage your blood requests to blood banks</p>
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
            
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-yellow-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Pending</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">{pendingRequests}</p>
                </div>
                <div className="bg-yellow-100 p-2 sm:p-3 rounded-full">
                  <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Processing</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">{processingRequests}</p>
                </div>
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                  <Building className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm mb-5 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Filter Requests</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Blood Bank</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="bloodBankName"
                    value={filters.bloodBankName}
                    onChange={handleFilterChange}
                    className="block w-full pl-10 py-2 sm:py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="Search blood bank name"
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

              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Status</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Package className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="block w-full pl-10 py-2 sm:py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm appearance-none"
                  >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
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
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('bloodBankName')}>
                      Blood Bank {getSortIcon('bloodBankName')}
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Types & Units
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('dateNeeded')}>
                      Needed By {getSortIcon('dateNeeded')}
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('status')}>
                      Status {getSortIcon('status')}
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
                        <div className="font-medium text-gray-900">{request.bloodBankName}</div>
                        <div className="text-gray-500 text-xs truncate max-w-[200px]">{request.bloodBankAddress}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 text-xs sm:text-sm">
                        <div className="space-y-1.5">
                          {request.bloodRequests.map((bloodReq, idx) => (
                            <div key={idx} className="flex items-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2">
                                {bloodReq.bloodType}
                              </span>
                              <span className="text-gray-700">{bloodReq.unitsRequested} units</span>
                            </div>
                          ))}
                          <div className="text-xs text-gray-500 mt-1">
                            Total: {getTotalUnits(request)} units
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <div className="text-gray-700">{new Date(request.dateNeeded).toLocaleDateString()}</div>
                        <div className="text-gray-500 text-xs">Requested on: {new Date(request.requestDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${request.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : request.status === 'Processing'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {request.status === 'Pending' && (
                            <span className="flex h-1.5 w-1.5 relative mr-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-500"></span>
                            </span>
                          )}
                          {request.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-right">
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleViewDetails(request)}
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 p-1.5 rounded-md transition-colors mr-1"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {request.status === 'Pending' && (
                            <button
                              onClick={() => handleCancelClick(request)}
                              className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 p-1.5 rounded-md transition-colors"
                              title="Cancel Request"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
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
                  onClick={() => setFilters({ bloodBankName: '', bloodType: '', dateNeeded: '', status: '' })}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {detailsModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 text-white rounded-t-xl flex justify-between items-center">
              <h2 className="text-xl font-bold">Request Details</h2>
              <button 
                onClick={() => setDetailsModalOpen(false)}
                className="text-white bg-white/20 hover:bg-white/30 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                  <Building className="w-4 h-4 mr-2 text-red-500" />
                  Blood Bank Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="space-y-2">
                    <p className="text-gray-800 font-medium">{selectedRequest.bloodBankName}</p>
                    <p className="text-gray-600 text-sm">{selectedRequest.bloodBankAddress}</p>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Phone className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                      {selectedRequest.contactInfo}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Mail className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                      {selectedRequest.email}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                  <Droplet className="w-4 h-4 mr-2 text-red-500" />
                  Blood Requests
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="space-y-4">
                    {selectedRequest.bloodRequests.map((bloodReq, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-800 font-semibold mr-3">
                            {bloodReq.bloodType}
                          </span>
                          <div>
                            <p className="text-gray-800 font-medium">{bloodReq.unitsRequested} units</p>
                            <p className="text-xs text-gray-500">Blood Type: {bloodReq.bloodType}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                      <span className="text-sm text-gray-500">Total Blood Units:</span>
                      <span className="font-semibold text-gray-800">{getTotalUnits(selectedRequest)} units</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Request Details</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-500 text-xs">Request Date</p>
                      <p className="text-gray-800">{new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Needed By</p>
                      <p className="text-gray-800">{new Date(selectedRequest.dateNeeded).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Status</h3>
                  <div className="space-y-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                      ${selectedRequest.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : selectedRequest.status === 'Processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {selectedRequest.status === 'Pending' && (
                        <span className="flex h-1.5 w-1.5 relative mr-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-500"></span>
                        </span>
                      )}
                      {selectedRequest.status}
                    </span>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      {selectedRequest.status === 'Pending' ? 
                        'Your request is waiting for blood bank approval.' : 
                        selectedRequest.status === 'Processing' ? 
                        'Your request is being processed by the blood bank.' :
                        'This request has been cancelled.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end border-t border-gray-200 pt-4">
                {selectedRequest.status === 'Pending' && (
                  <button
                    onClick={() => {
                      setDetailsModalOpen(false);
                      handleCancelClick(selectedRequest);
                    }}
                    className="bg-red-50 text-red-600 hover:bg-red-100 font-medium py-2 px-4 rounded-lg transition-colors mr-3 flex items-center"
                  >
                    <X className="w-4 h-4 mr-1.5" />
                    Cancel Request
                  </button>
                )}
                <button
                  onClick={() => setDetailsModalOpen(false)}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-red-100 p-4 flex items-center">
              <div className="bg-red-600 p-2 rounded-full mr-3">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-red-800">Cancel Blood Request</h2>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to cancel your request for <span className="font-semibold">{getTotalUnits(selectedRequest)} total units</span> of blood ({selectedRequest.bloodRequests.map(r => `${r.unitsRequested} ${r.bloodType}`).join(', ')}) from <span className="font-semibold">{selectedRequest.bloodBankName}</span>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The blood bank will be notified that you no longer need this blood request.
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  No, Keep Request
                </button>
                <button
                  onClick={confirmCancelRequest}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes, Cancel Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 