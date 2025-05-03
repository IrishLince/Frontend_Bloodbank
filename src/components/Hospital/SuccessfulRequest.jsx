import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import Header from '../Header';
import RefreshLink from '../RefreshLink';
import { navigateWithRefresh } from '../../utils/navigation';
import { CheckCircle, Clock, Calendar, Droplet, Building, Phone, MapPin, User, Package } from 'lucide-react';

export default function SuccessfulRequest() {
  const [countdown, setCountdown] = useState(30);
  const [bloodType, setBloodType] = useState('');
  const [unitsRequested, setUnitsRequested] = useState('');
  const [requestDate, setRequestDate] = useState('');
  const [dateNeeded, setDateNeeded] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [contactInformation, setContactInformation] = useState('');
  const [formError, setFormError] = useState(false);
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [buttonStyle, setButtonStyle] = useState('bg-red-600');
  const navigate = useNavigate();
  const location = useLocation();

  const {
    bloodType: stateBloodType,
    unitsRequested: stateUnitsRequested,
    requestDate: stateRequestDate,
    dateNeeded: stateDateNeeded,
    hospitalName: stateHospitalName,
    hospitalAddress: stateHospitalAddress,
    contactInformation: stateContactInformation,
  } = location.state || {};

  useEffect(() => {
    if (stateBloodType) setBloodType(stateBloodType);
    if (stateUnitsRequested) setUnitsRequested(stateUnitsRequested);
    if (stateRequestDate) setRequestDate(stateRequestDate);
    if (stateDateNeeded) setDateNeeded(stateDateNeeded);
    if (stateHospitalName) setHospitalName(stateHospitalName);
    if (stateHospitalAddress) setHospitalAddress(stateHospitalAddress);
    if (stateContactInformation) setContactInformation(stateContactInformation);
  }, [location.state]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigateWithRefresh('/'); 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleSubmit = () => {
    let newErrors = {};
    if (!bloodType) newErrors.bloodType = 'Blood type is required';
    if (!unitsRequested) newErrors.unitsRequested = 'Units requested is required';
    if (!requestDate) newErrors.requestDate = 'Request date is required';
    if (!dateNeeded) newErrors.dateNeeded = 'Date needed is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormError(true);
      return;
    }

    setFormError(false);
    setIsSubmitted(true);
    setButtonStyle('bg-red-700 opacity-50');
    navigateWithRefresh('/successful-request', {
      state: {
        bloodType,
        unitsRequested,
        requestDate,
        dateNeeded,
        hospitalName,
        hospitalAddress,
        contactInformation,
      },
    });
  };

  const handleNavigateToDetails = () => {
    navigateWithRefresh('/request-details', {
      state: {
        bloodType,
        unitsRequested,
        requestDate,
        dateNeeded,
        hospitalName,
        hospitalAddress,
        contactInformation,
      },
    });
  };

  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const isFieldDisabled = (fieldValue) => isSubmitted;

  // Generate reference number
  const referenceNumber = `REQ-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Function to format date to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen w-full overflow-x-hidden">
      <Header />

      {showNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-3 sm:p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
            
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-5 sm:p-6 md:p-8">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                </div>
              </div>
              
              <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-2">Request Submitted Successfully!</h2>
              <p className="text-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Your blood request has been received and is now being processed.
              </p>
              
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100 mb-4 sm:mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm text-gray-500">Reference Number:</span>
                  <span className="text-sm sm:text-base font-medium text-gray-800">{referenceNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-500">Status:</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                    Pending Approval
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 sm:space-y-3">
                <button
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium shadow-md transition-all"
                  onClick={handleNavigateToDetails}
                >
                  View Request Details
                </button>
                
                <RefreshLink to="/homepage">
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors w-full">
                    Return to Homepage
                  </button>
                </RefreshLink>
              </div>
              
              <div className="flex items-center justify-center mt-4 sm:mt-6 text-gray-500 text-xs sm:text-sm">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                <span>Redirecting in <span className="font-medium">{countdown}</span> seconds</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-red-100 to-red-50 p-4 sm:p-5 rounded-xl shadow-sm border border-red-200 mb-4 sm:mb-6 text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-red-800">Blood Request Confirmation</h1>
            <p className="text-sm sm:text-base text-red-600 mt-1">Review your submission details</p>
          </div>
        
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold">Request Summary</h2>
                <span className="bg-white text-red-600 text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                  {isSubmitted ? 'Submitted' : 'Draft'}
                </span>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-1 flex items-center">
                      <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-gray-400" />
                      Hospital Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="text-sm sm:text-base font-medium text-gray-800">{hospitalName || 'Riverside Community Medical Center'}</div>
                      <div className="text-xs sm:text-sm text-gray-600 flex items-start mt-1">
                        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="break-words">{hospitalAddress || '456 River Ave., Townsville'}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 flex items-center mt-1">
                        <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-gray-400" />
                        <span>{contactInformation || '(555) 987-6543'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-1 flex items-center">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-gray-400" />
                      Request Dates
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <div className="text-xs text-gray-500">Request Date</div>
                          <div className="text-sm sm:text-base font-medium text-gray-800">{formatDate(requestDate)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Date Needed</div>
                          <div className="text-sm sm:text-base font-medium text-gray-800">{formatDate(dateNeeded)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-1 flex items-center">
                      <Droplet className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-gray-400" />
                      Blood Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center mr-3">
                          <span className="text-xs sm:text-sm font-bold text-white">{bloodType || 'A+'}</span>
                        </div>
                        <div>
                          <div className="text-sm sm:text-base font-medium text-gray-800">{bloodType || 'A Positive'}</div>
                          <div className="text-xs text-gray-500">Blood Type</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Package className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm sm:text-base font-medium text-gray-800">{unitsRequested || '3'} units</div>
                          <div className="text-xs text-gray-500">Quantity Requested</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-1 flex items-center">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-gray-400" />
                      Request Details
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <div className="text-xs text-gray-500">Reference Number</div>
                          <div className="text-sm sm:text-base font-medium text-gray-800">{referenceNumber}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Status</div>
                          <div className="flex items-center">
                            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-yellow-500 mr-1.5"></div>
                            <span className="text-sm sm:text-base font-medium text-gray-800">Pending Approval</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-blue-100 mb-6 sm:mb-8 flex items-start">
                <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full mr-3 flex-shrink-0">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-blue-800">Processing Information</h4>
                  <p className="text-xs sm:text-sm text-blue-700 mt-1">
                    Your request is now being processed. You will receive notifications about the status of your request. 
                    Please allow 24-48 hours for the initial review.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg text-sm sm:text-base font-medium shadow-md transition-all"
                  onClick={handleNavigateToDetails}
                >
                  View Request Details
                </button>
                
                <RefreshLink to="/homepage">
                  <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg text-sm sm:text-base font-medium transition-colors">
                    Return to Dashboard
                  </button>
                </RefreshLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}