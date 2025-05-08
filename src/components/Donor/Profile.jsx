"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Eye, EyeOff, Gift, User, Shield, ChevronRight, X, UserCheck, Clock } from "lucide-react"
import Header from "../Header"
import RewardsSystem from "./RewardsSystem"
import DonationHistory from "./DonationHistory"

// Add a CSS block for global styles
const globalStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState("details")
  const [showEditModal, setShowEditModal] = useState(false)
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [showArchiveConfirmModal, setShowArchiveConfirmModal] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const navigate = useNavigate()

  // Add effect to prevent body scrolling when modals are open
  useEffect(() => {
    if (showEditModal || showArchiveModal || showArchiveConfirmModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showEditModal, showArchiveModal, showArchiveConfirmModal]);

  const renderEditProfileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#C91C1C] to-[#FF5757] text-white p-5 flex items-center justify-between sticky top-0 z-10 rounded-t-2xl">
          <h1 className="font-semibold text-xl">Edit Profile</h1>
          <button onClick={() => setShowEditModal(false)} className="p-1.5 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form with overflow control */}
        <div className="max-h-[70vh] overflow-y-auto">
          <form className="p-6 md:p-8">
            {/* Personal Details Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-2 text-[#C91C1C]" />
                Personal Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5 font-medium">Name</label>
                  <input
                    type="text"
                    defaultValue="Daniel Padilla"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent text-sm shadow-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1.5 font-medium">Username</label>
                  <input
                    type="text"
                    defaultValue="Donor"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed text-sm shadow-sm"
                    disabled
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5 font-medium">Contact Number</label>
                    <input
                      type="tel"
                      defaultValue="+63 987 654 3210"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent text-sm shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5 font-medium">Email Address</label>
                    <input
                      type="email"
                      defaultValue="danielpadilla@gmail.com"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent text-sm shadow-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1.5 font-medium">Location Address</label>
                  <input
                    type="text"
                    defaultValue="123 Quezon Ave., Manila, Metro Manila, Philippines"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent text-sm shadow-sm transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5 font-medium">Date of Birth</label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="26/04/1995"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent pr-10 text-sm shadow-sm transition-all"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5 font-medium">Blood Type</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent text-sm shadow-sm transition-all">
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-[#C91C1C]" />
                Security
              </h2>

              <div className="space-y-5">
                <div className="relative">
                  <label className="block text-sm text-gray-600 mb-1.5 font-medium">Old password</label>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent pr-10 text-sm shadow-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-[34px]"
                  >
                    {showOldPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-600 mb-1.5 font-medium">New password</label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent pr-10 text-sm shadow-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-[34px]"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-600 mb-1.5 font-medium">Confirm new password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent pr-10 text-sm shadow-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[34px]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium shadow-sm hover:shadow transition-all w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setShowEditModal(false);
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-[#C91C1C] to-[#FF5757] text-white rounded-lg hover:from-[#B91818] hover:to-[#E54545] font-medium shadow-sm hover:shadow-md transition-all w-full sm:w-auto"
              >
                Save Changes
              </button>
            </div>

            {/* Archive Account */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
                  setShowArchiveModal(true);
                }}
                className="px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                Archive Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

  const renderArchiveConfirmation = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md mx-4 shadow-xl animate-fadeIn">
        <div className="flex items-center mb-6">
          <button onClick={() => setShowArchiveModal(false)} className="flex items-center text-[#C91C1C] hover:bg-red-50 p-2 rounded-lg transition-colors">
            <ArrowLeft className="mr-1 w-5 h-5" />
            <span>BACK</span>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-red-100 shadow-md">
            <img src="/path-to-user-avatar.png" alt="" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">DANIEL PADILLA</h2>
          <p className="text-gray-600 mb-6 text-center">Are you sure you want to archive your account? This action will hide your profile but preserve your data.</p>
          <button
            onClick={() => {
              setShowArchiveModal(false);
              setShowArchiveConfirmModal(true);
            }}
            className="w-full bg-gradient-to-r from-[#880000] to-[#C91C1C] text-white rounded-lg py-3 font-medium hover:from-[#770000] hover:to-[#B91818] shadow-md hover:shadow-lg transition-all"
          >
            I WANT TO ARCHIVE THIS ACCOUNT
          </button>
        </div>
      </div>
    </div>
  )

  const renderArchiveConfirmationInput = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md mx-4 shadow-xl animate-fadeIn">
        <div className="flex items-center mb-6">
          <button onClick={() => {
            setShowArchiveConfirmModal(false);
            setShowArchiveModal(true);
          }} className="flex items-center text-[#C91C1C] hover:bg-red-50 p-2 rounded-lg transition-colors">
            <ArrowLeft className="mr-1 w-5 h-5" />
            <span>BACK</span>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-red-100 shadow-md">
            <img src="/path-to-user-avatar.png" alt="" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">DANIEL PADILLA</h2>
          <div className="w-full bg-red-50 p-4 rounded-lg mb-6">
            <p className="text-center text-gray-800 mb-2">To confirm, type "DANIEL PADILLA" in the box below</p>
            <p className="text-xs text-red-600 text-center">This action cannot be undone easily</p>
          </div>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent shadow-sm"
            placeholder="Type your full name here"
          />
          <button
            onClick={() => {
              if (confirmText === "DANIEL PADILLA") {
                alert("Account archived successfully")
                setShowArchiveConfirmModal(false);
              } else {
                alert("Please type your name exactly as shown above")
              }
            }}
            disabled={confirmText !== "DANIEL PADILLA"}
            className="w-full bg-gradient-to-r from-[#880000] to-[#C91C1C] text-white rounded-lg py-3 font-medium hover:from-[#770000] hover:to-[#B91818] disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
          >
            ARCHIVE THIS ACCOUNT
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFEBEB] to-white flex flex-col antialiased">
      {/* Apply global styles */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      <Header />
      <div className="flex-1 container px-4 sm:px-6 mx-auto max-w-6xl">
        {/* Profile Header - Fully Responsive */}
        <div className="relative z-10 mt-2 sm:mt-4 md:mt-6 lg:mt-8">
          <div className="bg-gradient-to-r from-[#C91C1C] to-[#FF5757] rounded-xl md:rounded-[2rem] shadow-lg overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-40 md:h-40 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/4" />
            <div className="absolute top-1/2 right-1/4 w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-white/10 rounded-full" />
            
            <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 z-10">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                <div className="relative group">
                  {/* Profile Image with Size Adjustments */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-white rounded-full border-4 border-white shadow-xl overflow-hidden transition-transform group-hover:scale-105">
                    <img
                      src="/path-to-user-avatar.png"
                      alt="Daniel Padilla"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 sm:p-1.5 shadow-lg">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center">
                      <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide drop-shadow-sm">DANIEL PADILLA</h2>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 md:mt-3">
                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm">
                          Active since 2020
                        </span>
                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" /> Last donation: 3 months ago
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setShowEditModal(true)}
                      className="hidden sm:flex items-center bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg backdrop-blur-sm shadow-md transition-all text-sm"
                    >
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Edit Button - Positioned for Better Mobile Experience */}
          <div className="sm:hidden -mt-4 mb-4 text-center">
            <button 
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center bg-white shadow-md text-[#C91C1C] px-4 py-1.5 rounded-full transition-all text-sm"
            >
              <User className="w-3.5 h-3.5 mr-1.5" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Responsive Tabs with Sizing Adjustments */}
        <div className="mt-4 sm:mt-6 md:mt-8 max-w-3xl mx-auto">
          <div className="overflow-x-auto no-scrollbar pb-0.5">
            <div className="grid grid-cols-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-w-[350px]">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-2 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all ${
                  activeTab === "details" 
                    ? "text-white bg-[#C91C1C]" 
                    : "text-gray-600 hover:text-[#C91C1C] hover:bg-red-50"
                }`}
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap text-[10px] sm:text-xs md:text-sm">Details</span>
              </button>
              <button
                onClick={() => setActiveTab("rewards")}
                className={`px-2 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all ${
                  activeTab === "rewards" 
                    ? "text-white bg-[#C91C1C]" 
                    : "text-gray-600 hover:text-[#C91C1C] hover:bg-red-50"
                }`}
              >
                <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap text-[10px] sm:text-xs md:text-sm">Rewards</span>
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-2 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all ${
                  activeTab === "history" 
                    ? "text-white bg-[#C91C1C]" 
                    : "text-gray-600 hover:text-[#C91C1C] hover:bg-red-50"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap text-[10px] sm:text-xs md:text-sm">History</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area with Responsive Spacing */}
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4">
          {/* Details Tab */}
          {activeTab === "details" ? (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden">
                {/* Card Header with More Structure */}
                <div className="relative px-3 sm:px-4 py-2.5 sm:py-3.5 border-b border-gray-100 bg-gradient-to-r from-[#FFEBEB] to-white">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 flex items-center">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 sm:mr-2 text-[#C91C1C]" />
                      Personal Information
                    </h3>
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="hidden sm:flex px-2 sm:px-3 py-1 sm:py-1.5 text-xs border border-[#C91C1C] text-[#C91C1C] rounded items-center hover:bg-red-50 transition-all"
                    >
                      Edit
                      <ChevronRight className="ml-1 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>
                
                {/* Card Content with Responsive Grid */}
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    {/* Email */}
                    <div className="bg-gray-50 hover:bg-gray-100/50 p-2 sm:p-3 rounded-lg transition-colors">
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Email</p>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-white p-1.5 sm:p-2 rounded-full border border-gray-100 shadow-sm">
                          <Mail size={14} className="text-[#C91C1C]" />
                        </div>
                        <span className="break-all text-gray-800 font-medium text-xs sm:text-sm md:text-base">donor@gmail.com</span>
                      </div>
                    </div>
                    
                    {/* Phone */}
                    <div className="bg-gray-50 hover:bg-gray-100/50 p-2 sm:p-3 rounded-lg transition-colors">
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Phone</p>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-white p-1.5 sm:p-2 rounded-full border border-gray-100 shadow-sm">
                          <Phone size={14} className="text-[#C91C1C]" />
                        </div>
                        <span className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">+63 987 654 3210</span>
                      </div>
                    </div>
                    
                    {/* Address - Full Width */}
                    <div className="bg-gray-50 hover:bg-gray-100/50 p-2 sm:p-3 rounded-lg transition-colors sm:col-span-2">
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Address</p>
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="bg-white p-1.5 sm:p-2 rounded-full border border-gray-100 shadow-sm mt-0.5">
                          <MapPin size={14} className="text-[#C91C1C]" />
                        </div>
                        <div>
                          <span className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">123 Quezon Ave., Manila, Metro Manila, Philippines</span>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 flex items-center">
                            <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 text-gray-400" /> 
                            Only shared with blood banks during donation appointments
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Date of Birth */}
                    <div className="bg-gray-50 hover:bg-gray-100/50 p-2 sm:p-3 rounded-lg transition-colors">
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Birth Date</p>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-white p-1.5 sm:p-2 rounded-full border border-gray-100 shadow-sm">
                          <Calendar size={14} className="text-[#C91C1C]" />
                        </div>
                        <div>
                          <span className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">April 26, 1995</span>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-0">Age: 28 years</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Blood Type */}
                    <div className="bg-gray-50 hover:bg-gray-100/50 p-2 sm:p-3 rounded-lg transition-colors">
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Blood Type</p>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-gradient-to-r from-[#C91C1C] to-[#FF5757] w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs sm:text-sm">A+</span>
                        </div>
                        <div>
                          <span className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">Type A Positive</span>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-0">Compatible with: A+, AB+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Security Notice - More Subtle and Responsive */}
                  <div className="mt-4 sm:mt-5 md:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="bg-blue-50 rounded-lg overflow-hidden">
                      <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3">
                        <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-[10px] sm:text-xs md:text-sm text-blue-700/90">
                          Your personal information is protected and only used for donation purposes. 
                          For security, we recommend updating your password regularly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "rewards" ? (
            <div>
              <RewardsSystem />
            </div>
          ) : (
            <div>
              <DonationHistory />
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      {showEditModal && renderEditProfileModal()}
      {showArchiveModal && renderArchiveConfirmation()}
      {showArchiveConfirmModal && renderArchiveConfirmationInput()}
    </div>
  )
}

export default ProfileManagement 