import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { UserCircle2 } from 'lucide-react';
import Header from '../Header'

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
  const [buttonStyle, setButtonStyle] = useState('bg-[#C91C1C]');  
  const navigate = useNavigate();
  const location = useLocation();
  
  const { bloodType: stateBloodType, unitsRequested: stateUnitsRequested, requestDate: stateRequestDate, dateNeeded: stateDateNeeded, hospitalName: stateHospitalName, hospitalAddress: stateHospitalAddress, contactInformation: stateContactInformation } = location.state || {};

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
          navigate('/'); 
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
    setButtonStyle('bg-[#A81A1A] opacity-50');  
    navigate('/successful-request', {
      state: { bloodType, unitsRequested, requestDate, dateNeeded, hospitalName, hospitalAddress, contactInformation },
    });
  };

  const handleHospitalNameChange = (e) => setHospitalName(e.target.value);
  const handleHospitalAddressChange = (e) => setHospitalAddress(e.target.value);
  const handleContactInformationChange = (e) => setContactInformation(e.target.value);
  const handleBloodTypeChange = (e) => setBloodType(e.target.value);
  const handleUnitsRequestedChange = (e) => setUnitsRequested(e.target.value);
  const handleRequestDateChange = (e) => setRequestDate(e.target.value);
  const handleDateNeededChange = (e) => setDateNeeded(e.target.value);

  const isFieldDisabled = (fieldValue) => isSubmitted;

  return (
    <div className="bg-transparent flex flex-col min-h-screen">
       <Header />

      

      {showNotification && (
        <div className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center h-full">
          <div className="bg-white p-6 rounded-xl w-[80%] max-w-[500px] relative">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-gray-600 text-lg"
            >
              X
            </button>
            <h2 className="text-center text-2xl font-semibold text-[#3A1A1A]">CONGRATULATIONS!</h2>
            <p className="mt-2 text-center text-[#3A1A1A]">You have successfully submitted your request, which is now pending for approval.</p>
            <div className="flex justify-center mt-6">
              <div className="w-16 h-16 bg-[#C91C1C] rounded-full flex items-center justify-center text-white font-bold text-xl">
                +
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="bg-[#C91C1C] text-white py-2 px-6 rounded-lg font-semibold hover:bg-[#A81A1A]"
                onClick={() => navigate('/request-details', { state: { bloodType, unitsRequested, requestDate, dateNeeded, hospitalName, hospitalAddress, contactInformation }})}
              >
                CONTINUE
              </button>
            </div>
            <div className="text-light-gray text-sm mt-4 text-center">
              <span className="underline">Redirecting you to homepage in {countdown}s</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center pt-2 pb-4">
        <div className="bg-[#F2F2F2] p-4 rounded-full w-[35%] text-center">
          <h1 className="text-[#C91C1C] text-xl font-bold">New Blood Request</h1>
        </div>
      </div>

      <div className="flex justify-center items-center pt-2 pb-4">
        <div className="bg-[#FFE7E7] p-6 rounded-xl w-[50%]">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold w-1/3">Hospital Name:</label>
              <input
                type="text"
                className="w-2/3 p-2 border rounded-md bg-[#F2F2F2] text-[#807373] font-bold"
                value={hospitalName || 'Riverside Community Medical Center'}
                onChange={handleHospitalNameChange}
                disabled={isFieldDisabled(hospitalName)} 
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold w-1/3">Hospital Address:</label>
              <input
                type="text"
                className="w-2/3 p-2 border rounded-md bg-[#F2F2F2] text-[#807373] font-bold"
                value={hospitalAddress || '456 River Ave., Townsville'}
                onChange={handleHospitalAddressChange}
                disabled={isFieldDisabled(hospitalAddress)} 
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold w-1/3">Contact Information:</label>
              <input
                type="text"
                className="w-2/3 p-2 border rounded-md bg-[#F2F2F2] text-[#807373] font-bold"
                value={contactInformation || '0987 654 3210'}
                onChange={handleContactInformationChange}
                disabled={isFieldDisabled(contactInformation)} 
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold w-1/3">Blood Type:</label>
              <input
                type="text"
                className="w-2/3 p-2 border rounded-md bg-[#F2F2F2] text-[#807373] font-bold"
                value={bloodType}
                onChange={handleBloodTypeChange}
                disabled={isFieldDisabled(bloodType)} 
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold w-1/3">Units Requested:</label>
              <input
                type="number"
                className="w-2/3 p-2 border rounded-md bg-[#F2F2F2] text-[#807373] font-bold"
                value={unitsRequested}
                onChange={handleUnitsRequestedChange}
                disabled={isFieldDisabled(unitsRequested)}
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold w-1/3">Request Date:</label>
              <input
                type="date"
                className="w-2/3 p-2 border rounded-md bg-[#F2F2F2] text-[#807373] font-bold"
                value={requestDate}
                onChange={handleRequestDateChange}
                disabled={isFieldDisabled(requestDate)} 
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold w-1/3">Date Needed:</label>
              <input
                type="date"
                className="w-2/3 p-2 border rounded-md bg-[#F2F2F2] text-[#807373] font-bold"
                value={dateNeeded}
                onChange={handleDateNeededChange}
                disabled={isFieldDisabled(dateNeeded)} 
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                className={`${buttonStyle} text-white py-2 px-6 rounded-lg font-semibold`}
                onClick={handleSubmit}
                disabled={isSubmitted} 
              >
                {isSubmitted ? 'SUBMITTED' : 'SUBMITTED'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
