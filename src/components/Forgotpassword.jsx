import React, { useState, useEffect } from 'react';
import { IoArrowBack } from "react-icons/io5";
import flagLogo from '../assets/Logophonenumber.png';
import cover from '../assets/cover.png';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = ({ setIsLogin, setIsForgotPassword }) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    let timer;
    if (!canResend && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    if (countdown === 0) {
      setCanResend(true);
      setCountdown(60);
    }
    return () => clearInterval(timer);
  }, [canResend, countdown]);

  const handleSendCode = (e) => {
    e.preventDefault();
    setStep(3);
    // Add logic to send the verification code
  };

  const handleResendCode = () => {
    if (canResend) {
      setCanResend(false);
      setCountdown(60); // Reset countdown for the next resend
      // Add your resend code logic here
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    // Add your verification logic here
  };

  const handleBack = () => {
    if (step > 1) {
      // If we're beyond step 1, go back one step
      setStep(step - 1);
    } else {
      // If we're on step 1, navigate back to login
      navigate('/login'); // Use navigate function directly
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${cover})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={backgroundStyle}>
      <div className="w-full max-w-md p-6 bg-pink-50 rounded-3xl shadow-xl mx-4">
        <button
          onClick={handleBack}
          className="text-gray-800 mb-6 flex items-center hover:text-gray-600 transition-colors"
          aria-label="Go back"
        >
          <IoArrowBack size={24} />
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {step === 3 ? 'Enter Verification Code' : 'Forgot your password?'}
        </h1>

        {step === 3 ? (
          <>
            <p className="text-gray-600 text-sm mb-6">
              A verification code has been sent to your contact number +63 9674324289.
              Please enter the code below to reset your password.
            </p>
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter verification code"
                />
              </div>
              {!canResend && (
                <p className="text-sm text-gray-600 mt-2">
                  You can request a new code in {countdown} seconds.
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                VERIFY CODE
              </button>
            </form>
            <button
              onClick={handleResendCode}
              className={`w-full text-center mt-4 text-sm ${canResend ? 'text-red-600 hover:text-red-700' : 'text-gray-400'}`}
              disabled={!canResend}
            >
              <span className="text-red-600">Didn't receive the code?</span> <strong className={`${canResend ? 'text-red-600' : 'text-gray-400'}`}>Resend Code.</strong>
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-600 text-sm mb-6">
              Enter your registered contact number to receive a password reset code.
            </p>
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <img
                    src={flagLogo}
                    alt="PH flag"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-4"
                  />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter contact number"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                SEND CODE
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
