import React, { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  ChevronUp, 
  ChevronDown, 
  MapPin, 
  Phone, 
  Clock, 
  Droplet, 
  Building, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Filter
} from 'lucide-react'
import Header from '../Header'

export default function DonationCenter() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })
  const [filters, setFilters] = useState({
    name: '',
    location: '',
    bloodTypes: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  
  const hospitals = [
    {
      name: "St. Mary's General Hospital",
      location: "123 Maple St., Cityville",
      phone: "(555) 123-4567",
      hours: "10:00 AM - 4:00 PM",
      bloodTypes: "O+, A+, B-",
      urgent: true
    },
    {
      name: "Riverside Community Medical Center",
      location: "456 River Ave., Townsville",
      phone: "(555) 987-6543",
      hours: "8:30 AM - 5:30 PM",
      bloodTypes: "AB+, O-",
      urgent: false
    },
    // ... other hospitals
  ]

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
    return sortConfig.direction === 'ascending' ? 
      <ChevronUp className="w-4 h-4 inline-block" /> : 
      <ChevronDown className="w-4 h-4 inline-block" />;
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      name: '',
      location: '',
      bloodTypes: ''
    });
    setSearchTerm('');
  };

  // Get blood type badge color
  const getBloodTypeColor = (bloodType) => {
    switch(bloodType.trim()) {
      case 'O+': return 'bg-red-100 text-red-800';
      case 'O-': return 'bg-red-200 text-red-800';
      case 'A+': return 'bg-blue-100 text-blue-800';
      case 'A-': return 'bg-blue-200 text-blue-800';
      case 'B+': return 'bg-green-100 text-green-800';
      case 'B-': return 'bg-green-200 text-green-800';
      case 'AB+': return 'bg-purple-100 text-purple-800';
      case 'AB-': return 'bg-purple-200 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAndSortedHospitals = useMemo(() => {
    // First filter the data
    let filteredData = [...hospitals];
    
    if (filters.name) {
      filteredData = filteredData.filter(item => 
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    
    if (filters.location) {
      filteredData = filteredData.filter(item => 
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.bloodTypes) {
      filteredData = filteredData.filter(item => 
        item.bloodTypes.toLowerCase().includes(filters.bloodTypes.toLowerCase())
      );
    }
    
    // Then apply the general search if it exists
    if (searchTerm) {
      filteredData = filteredData.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.bloodTypes.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [hospitals, searchTerm, filters, sortConfig]);

  const handleHospitalSelect = (hospital) => {
    navigate('/schedule', { state: { selectedHospital: hospital } })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-[1920px] mx-auto px-6 py-8">
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Select Donation Center"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-10 bg-gray-100 text-xl font-bold text-center rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 placeholder-opacity-75"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter toggle button */}
        <div className="flex justify-end mb-2">
          <button 
            onClick={resetFilters}
            className="text-sm text-red-600 hover:text-red-800 flex items-center"
          >
            Reset filters
          </button>
        </div>

        {/* Advanced Filter Section */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Building className="w-4 h-4 mr-1 text-red-500" />
                Donation Center
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-md pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Filter by name..."
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-red-500" />
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-md pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Filter by location..."
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Droplet className="w-4 h-4 mr-1 text-red-500" />
                Blood Types
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="bloodTypes"
                  value={filters.bloodTypes}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-md pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Filter by blood type..."
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-sm text-gray-600">
                <th className="text-left p-4 cursor-pointer" onClick={() => requestSort('name')}>
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-red-500" />
                    Donation Center {getSortIcon('name')}
                  </div>
                </th>
                <th className="text-left p-4 cursor-pointer" onClick={() => requestSort('location')}>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    Location {getSortIcon('location')}
                  </div>
                </th>
                <th className="text-left p-4 cursor-pointer" onClick={() => requestSort('phone')}>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-red-500" />
                    Contact Number {getSortIcon('phone')}
                  </div>
                </th>
                <th className="text-left p-4 cursor-pointer" onClick={() => requestSort('hours')}>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-red-500" />
                    Available Time Slots {getSortIcon('hours')}
                  </div>
                </th>
                <th className="text-left p-4 cursor-pointer" onClick={() => requestSort('bloodTypes')}>
                  <div className="flex items-center">
                    <Droplet className="w-4 h-4 mr-2 text-red-500" />
                    Blood Types Needed {getSortIcon('bloodTypes')}
                  </div>
                </th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedHospitals.length > 0 ? (
                filteredAndSortedHospitals.map((hospital, index) => (
                  <tr 
                    key={index}
                    onClick={() => handleHospitalSelect(hospital)}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        {hospital.urgent ? (
                          <AlertCircle className="w-4 h-4 mr-2 text-red-500" title="Urgent need" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" title="Normal status" />
                        )}
                        {hospital.name}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {hospital.location}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {hospital.phone}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {hospital.hours}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {hospital.bloodTypes.split(', ').map((type, i) => (
                          <span 
                            key={i} 
                            className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center ${getBloodTypeColor(type)}`}
                          >
                            <Droplet className="w-3 h-3 mr-1" />
                            {type}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                    No matching donation centers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <div className="max-w-[1920px] mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/booking" className="flex items-center text-gray-600 hover:text-red-500">
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-2">BACK</span>
        </Link>
        <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
          <span className="mr-2">CONFIRM</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
