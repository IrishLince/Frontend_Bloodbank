import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'
import { 
  FiTruck, 
  FiPackage, 
  FiCalendar, 
  FiFilter, 
  FiRefreshCw, 
  FiSearch,
  FiPlus,
  FiMap,
  FiPhoneCall,
  FiDroplet,
  FiActivity,
  FiClock,
  FiEye,
  FiCheck,
  FiArrowRight,
  FiMenu,
  FiChevronRight,
  FiDatabase
} from 'react-icons/fi'

export default function HospitalList() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('hospitals')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileFilterVisible, setMobileFilterVisible] = useState(false)

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
      deliveryStatus: "Pending"
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
      estimatedTime: "3:00 PM"
    },
    {
      id: "DEL-1002",
      hospital: "Riverside Community Medical Center",
      date: "2023-08-19",
      status: "Pending",
      items: "AB+ (2 units), O- (1 unit)",
      estimatedTime: "10:30 AM"
    },
    {
      id: "DEL-1003",
      hospital: "Mount Hope Regional Hospital",
      date: "2023-08-17",
      status: "In Transit",
      items: "A- (4 units)",
      estimatedTime: "1:15 PM"
    },
    {
      id: "DEL-1004",
      hospital: "Lakeside General Hospital",
      date: "2023-08-16",
      status: "Pending",
      items: "O- (3 units), B- (2 units)",
      estimatedTime: "ASAP"
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
      case 'Complete': return 'bg-green-100 text-green-800 border-green-200'
      case 'In Transit': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Scheduled': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Complete': return <FiCheck className="mr-1.5" />
      case 'In Transit': return <FiTruck className="mr-1.5" />
      case 'Scheduled': return <FiCalendar className="mr-1.5" />
      case 'Pending': return <FiClock className="mr-1.5" />
      default: return null
    }
  }

  const filteredHospitals = hospitals
    .filter(h => filterStatus === 'all' || h.deliveryStatus === filterStatus)
    .filter(h => 
      searchTerm === '' || 
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.bloodTypes.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const filteredDeliveries = deliveries
    .filter(d => filterStatus === 'all' || d.status === filterStatus)
    .filter(d => 
      searchTerm === '' || 
      d.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const formatBloodTypes = (bloodTypesStr) => {
    return bloodTypesStr.split(', ').map((type, index) => {
      let bgColor;
      
      if (type.includes('O-')) bgColor = 'bg-red-100 text-red-800';
      else if (type.includes('O+')) bgColor = 'bg-red-50 text-red-800';
      else if (type.includes('A-')) bgColor = 'bg-blue-100 text-blue-800';
      else if (type.includes('A+')) bgColor = 'bg-blue-50 text-blue-800';
      else if (type.includes('B-')) bgColor = 'bg-green-100 text-green-800';
      else if (type.includes('B+')) bgColor = 'bg-green-50 text-green-800';
      else if (type.includes('AB-')) bgColor = 'bg-purple-100 text-purple-800';
      else if (type.includes('AB+')) bgColor = 'bg-purple-50 text-purple-800';
      
      return (
        <span 
          key={index} 
          className={`inline-flex items-center px-2 py-0.5 mr-1.5 mb-1 rounded-full text-xs font-medium ${bgColor}`}
        >
          <FiDroplet className="mr-1 w-3 h-3" />
          {type}
        </span>
      );
    });
  }

  const toggleMobileFilters = () => {
    setMobileFilterVisible(!mobileFilterVisible);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Desktop pattern background */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 opacity-5">
        <div className="absolute right-0 top-0 w-1/3 h-1/3">
          <svg viewBox="0 0 100 100" className="w-full h-full text-red-500">
            <circle cx="80" cy="20" r="20" fill="currentColor" />
            <path d="M0 100 L100 0" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute left-0 bottom-0 w-1/3 h-1/3">
          <svg viewBox="0 0 100 100" className="w-full h-full text-red-500">
            <circle cx="20" cy="80" r="20" fill="currentColor" />
            <path d="M0 0 L100 100" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 sm:pt-8 pb-16 relative z-10">
        {/* Enhanced header with background effect for desktop */}
        <div className="mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 text-gray-800">
            <span className="bg-white shadow-md px-6 sm:px-10 lg:px-16 py-2 sm:py-3 lg:py-4 rounded-full inline-block text-[#C91C1C] relative">
              <span className="hidden lg:block absolute -left-4 -top-4 w-10 h-10 bg-red-50 rounded-full border-4 border-white"></span>
              <span className="hidden lg:block absolute -right-4 -bottom-4 w-10 h-10 bg-red-50 rounded-full border-4 border-white"></span>
              Blood Delivery Management
            </span>
          </h1>
          
          <div className="flex flex-wrap justify-center mt-4 sm:mt-6 gap-2 sm:gap-4 lg:gap-6">
            <button 
              onClick={() => setActiveTab('hospitals')}
              className={`px-4 sm:px-8 lg:px-10 py-2 sm:py-2.5 lg:py-3 rounded-full font-medium transition-all duration-300 flex items-center shadow-sm text-sm sm:text-base lg:text-lg ${
                activeTab === 'hospitals' 
                  ? 'bg-[#C91C1C] text-white hover:bg-[#b01818]' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiActivity className="mr-1.5 sm:mr-2 lg:mr-3 lg:w-5 lg:h-5" />
              Hospital Directory
            </button>
            <button 
              onClick={() => setActiveTab('deliveries')}
              className={`px-4 sm:px-8 lg:px-10 py-2 sm:py-2.5 lg:py-3 rounded-full font-medium transition-all duration-300 flex items-center shadow-sm text-sm sm:text-base lg:text-lg ${
                activeTab === 'deliveries' 
                  ? 'bg-[#C91C1C] text-white hover:bg-[#b01818]' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiTruck className="mr-1.5 sm:mr-2 lg:mr-3 lg:w-5 lg:h-5" />
              Delivery Management
            </button>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button 
            onClick={toggleMobileFilters}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center justify-between text-gray-700"
          >
            <span className="flex items-center">
              <FiFilter className="mr-2" />
              Filters & Search
            </span>
            <FiMenu />
          </button>
        </div>

        {/* Search & Filter Bar - Enhanced for desktop */}
        <div className={`
          flex flex-col md:flex-row md:items-center gap-4 mb-6 lg:mb-8
          ${mobileFilterVisible || 'md:flex' ? 'flex' : 'hidden'}
          ${mobileFilterVisible ? 'mb-6' : 'md:mb-6 hidden md:flex'}
        `}>
          <div className="relative w-full md:w-80 lg:w-96">
            <input
              type="text"
              placeholder={`Search ${activeTab === 'hospitals' ? 'hospitals' : 'deliveries'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 lg:py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none lg:text-base"
            />
            <FiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 lg:w-5 lg:h-5" />
          </div>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 items-start sm:items-center lg:gap-4">
            <label className="text-sm lg:text-base font-medium text-gray-600 whitespace-nowrap">Filter by status:</label>
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2.5 lg:py-3 pr-8 text-sm lg:text-base focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none w-full sm:w-auto"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Transit">In Transit</option>
              <option value="Complete">Complete</option>
            </select>
            <button 
              className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2.5 lg:py-3 rounded-lg hover:bg-gray-50 transition-all text-sm lg:text-base w-full sm:w-auto justify-center"
              onClick={() => { setFilterStatus('all'); setSearchTerm(''); }}
            >
              <FiRefreshCw className="mr-1.5" /> Reset
            </button>
          </div>
        </div>

        {activeTab === 'hospitals' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200 lg:transition-all lg:hover:shadow-xl">
            <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-200 flex justify-between items-center bg-white">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold flex items-center text-gray-800">
                <FiActivity className="mr-2 lg:mr-3 text-[#C91C1C] lg:w-6 lg:h-6" /> 
                Hospital Directory
              </h2>
            </div>
            
            {/* Mobile Card View */}
            <div className="md:hidden">
              {filteredHospitals.length > 0 ? filteredHospitals.map((hospital, index) => (
                <div key={index} className="p-4 border-b last:border-b-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-800">{hospital.name}</h3>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <FiPhoneCall className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                        {hospital.phone}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border ${getStatusColor(hospital.deliveryStatus)}`}>
                      {getStatusIcon(hospital.deliveryStatus)}
                      {hospital.deliveryStatus}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-700 text-sm mb-3">
                    <FiMap className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    {hospital.location}
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-xs font-medium text-gray-500 mb-1">Blood Types</div>
                    <div className="flex flex-wrap">
                      {formatBloodTypes(hospital.bloodTypes)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">Units</div>
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-medium ${
                        hospital.requests > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {hospital.requests}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewRequests(hospital)}
                        className="px-3 py-1.5 text-xs text-white bg-[#F05B5B] rounded-lg hover:bg-[#e04d4d] transition-all shadow-sm flex items-center"
                      >
                        <FiEye className="mr-1" /> View
                      </button>
                      <button
                        onClick={() => handleCreateDelivery(hospital)}
                        className="px-3 py-1.5 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all shadow-sm flex items-center"
                      >
                        <FiTruck className="mr-1" /> Schedule
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-gray-500">
                  No hospitals match your search criteria. Try adjusting your filters.
                </div>
              )}
            </div>
            
            {/* Enhanced Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-sm lg:text-base text-gray-600">
                    <th className="text-left p-4 lg:p-5 border-b font-semibold">Hospital</th>
                    <th className="text-left p-4 lg:p-5 border-b font-semibold">Location</th>
                    <th className="text-left p-4 lg:p-5 border-b font-semibold">Blood Types</th>
                    <th className="text-left p-4 lg:p-5 border-b font-semibold">Units</th>
                    <th className="text-left p-4 lg:p-5 border-b font-semibold">Request Status</th>
                    <th className="p-4 lg:p-5 border-b text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHospitals.length > 0 ? (
                    filteredHospitals.map((hospital, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 transition-colors lg:transition-all lg:cursor-pointer group">
                        <td className="p-4 lg:p-5">
                          <div className="font-medium text-gray-800 lg:text-lg">{hospital.name}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <FiPhoneCall className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                            {hospital.phone}
                          </div>
                        </td>
                        <td className="p-4 lg:p-5">
                          <div className="flex items-center text-gray-700 lg:text-base">
                            <FiMap className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                            {hospital.location}
                          </div>
                        </td>
                        <td className="p-4 lg:p-5">
                          <div className="flex flex-wrap">
                            {formatBloodTypes(hospital.bloodTypes)}
                          </div>
                        </td>
                        <td className="p-4 lg:p-5">
                          <span className={`inline-flex items-center justify-center w-7 h-7 lg:w-9 lg:h-9 rounded-full font-medium lg:text-base ${
                            hospital.requests > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {hospital.requests}
                          </span>
                        </td>
                        <td className="p-4 lg:p-5">
                          <span className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium inline-flex items-center border ${getStatusColor(hospital.deliveryStatus)}`}>
                            {getStatusIcon(hospital.deliveryStatus)}
                            {hospital.deliveryStatus}
                          </span>
                        </td>
                        <td className="p-4 lg:p-5">
                          <div className="flex justify-center space-x-2 lg:space-x-3 opacity-90 group-hover:opacity-100">
                            <button
                              onClick={() => handleViewRequests(hospital)}
                              className="px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base text-white bg-[#F05B5B] rounded-lg hover:bg-[#e04d4d] transition-all shadow-sm flex items-center"
                            >
                              <FiEye className="mr-1.5 lg:mr-2 lg:w-5 lg:h-5" /> View Requests
                            </button>
                            <button
                              onClick={() => handleCreateDelivery(hospital)}
                              className="px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all shadow-sm flex items-center"
                            >
                              <FiTruck className="mr-1.5 lg:mr-2 lg:w-5 lg:h-5" /> Schedule Delivery
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-8 lg:p-12 text-center text-gray-500 lg:text-lg">
                        No hospitals match your search criteria. Try adjusting your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'deliveries' && (
          <>
            {/* Enhanced Stats Cards for Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6 mb-8">              
              <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm hover:shadow-lg cursor-pointer transition-all flex items-center border-l-4 border-yellow-500">
                <div className="p-2 sm:p-3 lg:p-4 rounded-full bg-yellow-100 mr-3 sm:mr-4">
                  <FiPackage className="text-yellow-600 text-lg sm:text-xl lg:text-2xl" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-500 font-medium">Pending</div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                    {deliveries.filter(d => d.status === 'Pending').length}
                  </div>
                </div>
                <div className="ml-auto hidden lg:flex">
                  <FiChevronRight className="text-gray-400 w-6 h-6" />
                </div>
              </div>
              
              <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm hover:shadow-lg cursor-pointer transition-all flex items-center border-l-4 border-blue-500">
                <div className="p-2 sm:p-3 lg:p-4 rounded-full bg-blue-100 mr-3 sm:mr-4">
                  <FiTruck className="text-blue-600 text-lg sm:text-xl lg:text-2xl" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-500 font-medium">In Transit</div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                    {deliveries.filter(d => d.status === 'In Transit').length}
                  </div>
                </div>
                <div className="ml-auto hidden lg:flex">
                  <FiChevronRight className="text-gray-400 w-6 h-6" />
                </div>
              </div>
              
              <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm hover:shadow-lg cursor-pointer transition-all flex items-center border-l-4 border-purple-500">
                <div className="p-2 sm:p-3 lg:p-4 rounded-full bg-purple-100 mr-3 sm:mr-4">
                  <FiCalendar className="text-purple-600 text-lg sm:text-xl lg:text-2xl" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-500 font-medium">Scheduled</div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                    {deliveries.filter(d => d.status === 'Scheduled').length}
                  </div>
                </div>
                <div className="ml-auto hidden lg:flex">
                  <FiChevronRight className="text-gray-400 w-6 h-6" />
                </div>
              </div>
            </div>
            
            
            
            {/* Deliveries Table/Cards Section - Enhanced for Desktop */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200 lg:transition-all lg:hover:shadow-xl">
              <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold flex items-center text-gray-800">
                  <FiTruck className="mr-2 lg:mr-3 text-[#C91C1C] lg:w-6 lg:h-6" /> Manage Blood Deliveries
                </h2>
                <button 
                  onClick={() => navigate('/schedule')}
                  className="flex items-center text-xs sm:text-sm lg:text-base text-white bg-[#C91C1C] hover:bg-[#b01818] px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 rounded-lg transition-all shadow-sm lg:shadow-md"
                >
                  <FiPlus className="mr-1 sm:mr-1.5 lg:mr-2 lg:w-5 lg:h-5" /> New Delivery
                </button>
              </div>
              
              {/* Mobile Card View */}
              <div className="md:hidden">
                {filteredDeliveries.length > 0 ? filteredDeliveries.map((delivery, index) => (
                  <div key={index} className="p-4 border-b last:border-b-0">
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-medium text-gray-800">{delivery.id}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center border ${getStatusColor(delivery.status)}`}>
                        {getStatusIcon(delivery.status)}
                        {delivery.status}
                      </span>
                    </div>
                    
                    <div className="text-gray-700 mb-2">{delivery.hospital}</div>
                    
                    <div className="mb-3">
                      <div className="text-xs font-medium text-gray-500 mb-1">Blood Products</div>
                      <div className="flex flex-wrap gap-1">
                        {delivery.items.split(', ').map((item, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-800 rounded-lg text-xs"
                          >
                            <FiDroplet className="mr-1 w-3 h-3" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">Date</div>
                        <div className="text-sm">{delivery.date}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">Time</div>
                        <div className="text-sm flex items-center">
                          <FiClock className="w-3 h-3 mr-1" />
                          {delivery.estimatedTime}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center shadow-sm"
                        onClick={() => navigate('/schedule', { state: { delivery } })}
                      >
                        <FiEye className="mr-1 w-3 h-3" /> Track
                      </button>
                      <button 
                        className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center shadow-sm"
                        onClick={() => {
                          // Update status logic would go here
                          alert(`Update status for ${delivery.id}`);
                        }}
                      >
                        <FiArrowRight className="mr-1 w-3 h-3" /> Update
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center text-gray-500">
                    No deliveries match your search criteria. Try adjusting your filters.
                  </div>
                )}
              </div>
              
              {/* Enhanced Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-sm lg:text-base text-gray-600">
                      <th className="text-left p-4 lg:p-5 border-b font-semibold">Delivery ID</th>
                      <th className="text-left p-4 lg:p-5 border-b font-semibold">Hospital</th>
                      <th className="text-left p-4 lg:p-5 border-b font-semibold">Blood Products</th>
                      <th className="text-left p-4 lg:p-5 border-b font-semibold">Date & Time</th>
                      <th className="text-left p-4 lg:p-5 border-b font-semibold">Request Status</th>
                      <th className="p-4 lg:p-5 border-b text-center font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeliveries.length > 0 ? (
                      filteredDeliveries.map((delivery, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 transition-colors lg:transition-all lg:cursor-pointer group">
                          <td className="p-4 lg:p-5 font-medium text-gray-800 lg:text-lg">{delivery.id}</td>
                          <td className="p-4 lg:p-5 text-gray-700 lg:text-base">{delivery.hospital}</td>
                          <td className="p-4 lg:p-5">
                            <div className="flex flex-wrap gap-1">
                              {delivery.items.split(', ').map((item, i) => (
                                <span 
                                  key={i} 
                                  className="inline-flex items-center px-2 py-0.5 lg:px-3 lg:py-1 bg-blue-50 text-blue-800 rounded-lg text-xs lg:text-sm"
                                >
                                  <FiDroplet className="mr-1 w-3 h-3 lg:w-4 lg:h-4" />
                                  {item}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 lg:p-5">
                            <div className="text-gray-800 lg:text-base">{delivery.date}</div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <FiClock className="w-3.5 h-3.5 mr-1.5" />
                              {delivery.estimatedTime}
                            </div>
                          </td>
                          <td className="p-4 lg:p-5">
                            <span className={`px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium inline-flex items-center border ${getStatusColor(delivery.status)}`}>
                              {getStatusIcon(delivery.status)}
                              {delivery.status}
                            </span>
                          </td>
                          <td className="p-4 lg:p-5">
                            <div className="flex justify-center space-x-2 lg:space-x-3 opacity-90 group-hover:opacity-100">
                              <button 
                                className="px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center shadow-sm lg:shadow-md"
                                onClick={() => navigate('/schedule', { state: { delivery } })}
                              >
                                <FiEye className="mr-1.5 w-3.5 h-3.5 lg:w-4 lg:h-4" /> Track
                              </button>
                              <button 
                                className="px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center shadow-sm lg:shadow-md"
                                onClick={() => {
                                  // Update status logic would go here
                                  alert(`Update status for ${delivery.id}`);
                                }}
                              >
                                <FiArrowRight className="mr-1.5 w-3.5 h-3.5 lg:w-4 lg:h-4" /> Update
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="p-8 lg:p-12 text-center text-gray-500 lg:text-lg">
                          No deliveries match your search criteria. Try adjusting your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Enhanced action button */}
            <div className="flex justify-center">
              <button 
                onClick={() => navigate('/schedule')}
                className="bg-[#C91C1C] text-white py-2 sm:py-3 lg:py-4 px-6 sm:px-8 lg:px-10 rounded-xl font-bold hover:bg-[#b01818] transition-all flex items-center shadow-md text-sm sm:text-base lg:text-lg"
              >
                <FiTruck className="mr-1.5 sm:mr-2 lg:mr-3 lg:w-6 lg:h-6" /> Schedule New Delivery
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
