import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, AlertCircle, Info, Calendar, Droplet, Building, Phone, User, Package, ChevronDown } from 'lucide-react';
import Header from '../Header';

export default function NewRequest() {
  const [requestDate, setRequestDate] = useState('');
  const [dateNeeded, setDateNeeded] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [unitsRequested, setUnitsRequested] = useState('');
  const [formError, setFormError] = useState(false); 
  const [errors, setErrors] = useState({});
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState('');
  const navigate = useNavigate();

  // Mock data for blood admin centers
  const bloodAdminCenters = [
    {
      id: 'admin1',
      name: 'RedSource Central Blood Bank',
      location: 'Downtown Medical District',
      inventory: [
        { type: 'A+', available: 25 },
        { type: 'A-', available: 12 },
        { type: 'B+', available: 18 },
        { type: 'B-', available: 8 },
        { type: 'AB+', available: 5 },
        { type: 'AB-', available: 3 },
        { type: 'O+', available: 30 },
        { type: 'O-', available: 15 },
      ]
    },
    {
      id: 'admin2',
      name: 'City Regional Blood Center',
      location: 'North Hospital Complex',
      inventory: [
        { type: 'A+', available: 15 },
        { type: 'A-', available: 7 },
        { type: 'B+', available: 10 },
        { type: 'B-', available: 4 },
        { type: 'AB+', available: 2 },
        { type: 'AB-', available: 1 },
        { type: 'O+', available: 20 },
        { type: 'O-', available: 8 },
      ]
    },
    {
      id: 'admin3',
      name: 'Metro Blood Network',
      location: 'East Medical Plaza',
      inventory: [
        { type: 'A+', available: 18 },
        { type: 'A-', available: 9 },
        { type: 'B+', available: 12 },
        { type: 'B-', available: 5 },
        { type: 'AB+', available: 3 },
        { type: 'AB-', available: 0 },
        { type: 'O+', available: 22 },
        { type: 'O-', available: 6 },
      ]
    }
  ];

  // Get all available blood types across all centers
  const allAvailableBloodTypes = bloodAdminCenters.reduce((types, center) => {
    center.inventory.forEach(item => {
      if (item.available > 0 && !types.includes(item.type)) {
        types.push(item.type);
      }
    });
    return types;
  }, []);

  // Get total available units for a specific blood type
  const getTotalAvailable = (type) => {
    return bloodAdminCenters.reduce((total, center) => {
      const inventory = center.inventory.find(item => item.type === type);
      return total + (inventory?.available || 0);
    }, 0);
  };

  const handleRequestDateChange = (e) => {
    setRequestDate(e.target.value);
    setErrors({ ...errors, requestDate: '' }); 
  };

  const handleDateNeededChange = (e) => {
    setDateNeeded(e.target.value);
    setErrors({ ...errors, dateNeeded: '' }); 
  };

  const handleBloodTypeChange = (e) => {
    setBloodType(e.target.value);
    setErrors({ ...errors, bloodType: '' }); 
  };

  const handleUnitsRequestedChange = (e) => {
    const value = Math.max(0, Number(e.target.value)); 
    setUnitsRequested(value);
    setErrors({ ...errors, unitsRequested: '' }); 
    
    // Validate against available units
    if (bloodType && value > getTotalAvailable(bloodType)) {
      setErrors({ ...errors, unitsRequested: `Only ${getTotalAvailable(bloodType)} units available` });
    }
  };

  const handleAdminSelect = (adminId) => {
    setSelectedAdminId(adminId);
    setShowAvailabilityModal(false);
  };

  const handleSubmit = () => {
    let newErrors = {};
    if (!bloodType) newErrors.bloodType = 'Blood type is required';
    if (!unitsRequested) newErrors.unitsRequested = 'Units requested is required';
    if (!requestDate) newErrors.requestDate = 'Request date is required';
    if (!dateNeeded) newErrors.dateNeeded = 'Date needed is required';
    if (!selectedAdminId) newErrors.bloodSource = 'Blood source is required';

    // Check if requested units exceed available
    if (bloodType && unitsRequested > getTotalAvailable(bloodType)) {
      newErrors.unitsRequested = `Only ${getTotalAvailable(bloodType)} units available`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); 
      setFormError(true); 
      return;
    }

    setFormError(false); 
    navigate('/successful-request', {
      state: { 
        bloodType, 
        unitsRequested, 
        requestDate, 
        dateNeeded,
        bloodSource: bloodAdminCenters.find(admin => admin.id === selectedAdminId)?.name 
      },
    });
  };

  // Get the selected admin details
  const selectedAdmin = bloodAdminCenters.find(admin => admin.id === selectedAdminId);
  
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-6">
        <Link to="/welcome-message" className="inline-flex mb-4 sm:mb-6">
          <button className="flex items-center text-red-600 hover:text-red-800 transition-colors text-sm font-medium bg-white rounded-lg py-1.5 sm:py-2 px-3 sm:px-4 shadow-sm border border-gray-100">
            <ChevronLeft className="mr-1 w-4 h-4" /> Back to Dashboard
          </button>
        </Link>

        <div className="flex justify-center mb-5 sm:mb-8">
          <div className="bg-gradient-to-r from-red-100 to-red-50 shadow-md p-4 sm:p-5 rounded-xl w-full max-w-3xl border border-red-200">
            <h1 className="text-xl sm:text-2xl font-bold text-red-800 text-center">New Blood Request</h1>
            <p className="text-red-600 text-center mt-1 text-sm sm:text-base">Request blood supplies for your hospital</p>
          </div>
        </div>

        <div className="flex justify-center items-start">
          <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 sm:py-4 px-4 sm:px-6 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold">Request Details</h2>
              <p className="text-xs sm:text-sm opacity-90">Please provide accurate information for your blood request</p>
            </div>
            
            <div className="p-4 sm:p-6 md:p-8">
              {formError && (
                <div className="mb-4 sm:mb-6 bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-md">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Please correct the following errors:</h3>
                      <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                        {Object.values(errors).map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid gap-6 sm:gap-8">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Building className="w-4 h-4 mr-2 text-gray-500" />
                    Hospital Information
                  </label>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 mb-1">Hospital Name</p>
                        <p className="font-medium text-gray-800 text-sm sm:text-base">Riverside Community Medical Center</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 mb-1">Contact Information</p>
                        <p className="font-medium text-gray-800 text-sm sm:text-base">(555) 987-6543</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs sm:text-sm text-gray-500 mb-1">Hospital Address</p>
                        <p className="font-medium text-gray-800 text-sm sm:text-base">456 River Ave., Townsville</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    Blood Source
                  </label>
                  <div className="relative">
                    <div 
                      className={`w-full p-3 sm:p-3.5 border ${errors.bloodSource ? 'border-red-500' : 'border-gray-300'} rounded-lg cursor-pointer hover:border-red-500 transition-colors bg-white flex items-center justify-between`}
                      onClick={() => setShowAvailabilityModal(true)}
                    >
                      <span className={`text-sm sm:text-base ${selectedAdmin ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                        {selectedAdmin ? selectedAdmin.name : "Select Blood Center"}
                      </span>
                      <ChevronDown className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                    </div>
                    {errors.bloodSource && (
                      <p className="text-red-500 text-xs mt-1">{errors.bloodSource}</p>
                    )}
                  </div>
                  
                  {/* Blood Center Modal */}
                  {showAvailabilityModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                      <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                          <h3 className="text-base sm:text-lg font-bold text-gray-800">Select Blood Center</h3>
                          <button 
                            onClick={() => setShowAvailabilityModal(false)} 
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="space-y-3 sm:space-y-4">
                          {bloodAdminCenters.map((admin) => (
                            <div 
                              key={admin.id} 
                              className={`p-3 sm:p-4 border ${selectedAdminId === admin.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'} rounded-lg cursor-pointer transition-all`}
                              onClick={() => handleAdminSelect(admin.id)}
                            >
                              <div className="flex justify-between mb-1 sm:mb-2">
                                <h4 className="font-medium text-gray-800 text-sm sm:text-base">{admin.name}</h4>
                                {selectedAdminId === admin.id && (
                                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-red-500" />
                                )}
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{admin.location}</p>
                              
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                                {admin.inventory.map((item) => (
                                  <div 
                                    key={item.type} 
                                    className={`p-1.5 sm:p-2 rounded-md text-xs ${item.available > 0 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'} flex flex-col items-center justify-center`}
                                  >
                                    <span className="font-bold text-xs sm:text-sm">{item.type}</span>
                                    <span className="text-xs">{item.available} units</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Droplet className="w-4 h-4 mr-2 text-gray-500" />
                      Blood Type
                    </label>
                    <select
                      className={`w-full p-3 sm:p-3.5 border ${errors.bloodType ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm ${!selectedAdminId ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-800'} focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base`}
                      value={bloodType}
                      onChange={handleBloodTypeChange}
                      disabled={!selectedAdminId}
                    >
                      <option value="">Select Blood Type</option>
                      {selectedAdmin ? (
                        selectedAdmin.inventory
                          .filter(item => item.available > 0)
                          .map(item => (
                            <option key={item.type} value={item.type}>
                              {item.type} - {item.available} units available
                            </option>
                          ))
                      ) : (
                        allAvailableBloodTypes.map(type => (
                          <option key={type} value={type}>
                            {type} - {getTotalAvailable(type)} units available
                          </option>
                        ))
                      )}
                    </select>
                    {errors.bloodType && (
                      <p className="text-red-500 text-xs mt-1">{errors.bloodType}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Package className="w-4 h-4 mr-2 text-gray-500" />
                      Units Requested
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={unitsRequested}
                      onChange={handleUnitsRequestedChange}
                      disabled={!bloodType}
                      className={`w-full p-3 sm:p-3.5 border ${errors.unitsRequested ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm ${!bloodType ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-800'} focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base`}
                      placeholder="Enter number of units"
                    />
                    {errors.unitsRequested ? (
                      <p className="text-red-500 text-xs mt-1">{errors.unitsRequested}</p>
                    ) : (
                      bloodType && (
                        <p className="text-xs text-gray-500 mt-1">
                          <Info className="inline w-3 h-3 mr-1" />
                          Maximum available: {getTotalAvailable(bloodType)} units
                        </p>
                      )
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      Request Date
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={requestDate}
                      onChange={handleRequestDateChange}
                      className={`w-full p-3 sm:p-3.5 border ${errors.requestDate ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base`}
                    />
                    {errors.requestDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.requestDate}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      Date Needed
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={dateNeeded}
                      onChange={handleDateNeededChange}
                      className={`w-full p-3 sm:p-3.5 border ${errors.dateNeeded ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base`}
                    />
                    {errors.dateNeeded && (
                      <p className="text-red-500 text-xs mt-1">{errors.dateNeeded}</p>
                    )}
                  </div>
                </div>
                
                <div className="pt-2 sm:pt-4">
                  <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-100 flex items-start mb-4 sm:mb-6">
                    <Info className="text-red-600 w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-red-800">Important Information</h4>
                      <p className="text-xs sm:text-sm text-red-700 mt-1">
                        Please note that all blood requests require verification and processing time. For emergency requests, please contact the blood center directly.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedAdminId || !bloodType || !unitsRequested || !requestDate || !dateNeeded}
                      className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-white text-sm sm:text-base
                        ${(!selectedAdminId || !bloodType || !unitsRequested || !requestDate || !dateNeeded) 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transform hover:-translate-y-1 shadow-md hover:shadow-lg transition-all'
                        }`}
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
