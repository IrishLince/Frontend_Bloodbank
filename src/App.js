import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import AboutUs from './components/abousus';
import SuccessfulLogin from './components/SuccesfulLogin';
import DonationCenter from './components/onlineBooking/DonationCenter';
import Schedule from './components/onlineBooking/Schedule';
import EligibilityCheck from './components/onlineBooking/EligibilityCheck';
import ConfirmAppointment from './components/onlineBooking/ConfirmAppointment';
import AppointmentDetails from './components/onlineBooking/AppointmentDetails';

import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const token = localStorage.getItem('userToken');

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false); // Stop loading once check is complete
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading spinner or message
  }

  return (
    <Router>
      <Routes>
        {/* Default route based on login status */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/successful-login" /> : <Navigate to="/homepage" />}
        />

        {/* Public routes */}
        <Route path="/homepage" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* Protected routes (only accessible when logged in) */}
        {isLoggedIn && (
          <>
            <Route path="/successful-login" element={<SuccessfulLogin />} />
            <Route path="/donation-center" element={<DonationCenter />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/eligibility" element={<EligibilityCheck />} />
            <Route path="/confirm-appointment" element={<ConfirmAppointment />} />
            <Route path="/appointment-details" element={<AppointmentDetails />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
